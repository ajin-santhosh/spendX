import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from "./src/config/db.js";
import {connectRedis} from "./src/config/redis.js"
import errorHandler from "./src/middleware/errorHandler.js";
import userRoutes from "./src/routes/userRoutes.js";
import registrationRoutes from "./src/routes/registrationRoutes.js";
const app = express();

const PORT = process.env.Port
connectDB()
connectRedis()
app.use(express.json());
app.use(cookieParser())
app.use('/spendx/api/user',userRoutes)
app.use('/spendx/api/registration',registrationRoutes)


app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});