import jwt        from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import redis      from '../config/redis.js';


const rtKey = (userId, deviceId) => `rt:${userId}:${deviceId}`;

// ── Access token 


export function signAccessToken(userId) {
  return jwt.sign(
    { sub: userId.toString() },   // sub = subject (who this token is for)
    process.env.ACCESS_SECRET,
    { expiresIn: 15 * 60 }        
  );
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.ACCESS_SECRET);
}

// ── Refresh token 

export async function createRefreshToken(userId, deviceId, meta = {}) {
  const token = uuidv4();   // random, unpredictable, 122 bits of entropy

  await redis.setex(
    rtKey(userId, deviceId),
    7 * 24 * 60 * 60,            
    JSON.stringify({
      token,
      userId:    userId.toString(),
      deviceId,
      userAgent: meta.userAgent || '',
      ip:        meta.ip        || '',
      issuedAt:  Date.now(),      // for "logged in 3 days ago" display
    })
  );

  return token;
}

export async function verifyRefreshToken(userId, deviceId, token) {
  const raw = await redis.get(rtKey(userId, deviceId));

  // null means: TTL expired OR was deleted by logout
  if (!raw) return null;

  const session = JSON.parse(raw);

  // Token mismatch = stale token (already rotated) or forged token
  if (session.token !== token) return null;

  return session;
}

// Delete old, create new — called on every /auth/refresh

export async function rotateRefreshToken(userId, deviceId, meta = {}) {
  await redis.del(rtKey(userId, deviceId));
  return createRefreshToken(userId, deviceId, meta);
}

// ── Session management ────────────────────────────────────────────────────────

export async function revokeSession(userId, deviceId) {
  return redis.del(rtKey(userId, deviceId));
}

export async function revokeAllSessions(userId) {
  // Find all sessions for this user across every device
  const keys = await redis.keys(`rt:${userId}:*`);
  if (keys.length) await redis.del(...keys);   // del accepts multiple keys
}

// For "manage devices" UI — returns session metadata, never the raw token
export async function listSessions(userId) {
  const keys = await redis.keys(`rt:${userId}:*`);
  if (!keys.length) return [];

  const values = await redis.mget(...keys);   // one round-trip for all keys

  return values
    .map(v => (v ? JSON.parse(v) : null))
    .filter(Boolean)
    .map(({ token: _, ...safe }) => safe);    // strip token, keep metadata
}