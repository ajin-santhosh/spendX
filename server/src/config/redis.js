import Redis from 'ioredis';

// Create the client — ioredis auto-detects rediss:// (TLS) vs redis://
const redis = new Redis(process.env.REDIS_URL, {
  lazyConnect: true,          // don't connect on import, connect on first command
  maxRetriesPerRequest: 3,    // fail fast instead of hanging

  retryStrategy(times) {
    if (times > 5) return null;             // stop retrying after 5 attempts
    return Math.min(times * 300, 3000);     // wait 300ms → 600ms → ... → 3s
  },
});

redis.on('connect', () => console.log('[Redis] connected'));
redis.on('ready',   () => console.log('[Redis] ready'));
redis.on('error',   (e) => console.error('[Redis] error:', e.message));
redis.on('close',   () => console.warn('[Redis] connection closed'));

// Called from app.js startup — forces the connection before requests begin
export async function connectRedis() {
  try {
    await redis.connect();
    await redis.ping(); // verify it actually works
    console.log('[Redis] ping ok');
  } catch (err) {
    console.error('[Redis] connection failed:', err.message);
    process.exit(1);
  }
}

export default redis;