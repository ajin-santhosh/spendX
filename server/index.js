require('dotenv').config()
const express = require('express');
const connectDB = require("./src/config/db")
const errorHandler = require("./src/middleware/errorHandler")
const userRoutes = require("./src/routes/userRoutes")
const registrationRoutes = require ("./src/routes/registrationRoutes")
const app = express();

const PORT = process.env.Port
connectDB()
app.use(express.json());
app.use('/spendx/api/user',userRoutes)
app.use('/spendx/api/registration',registrationRoutes)


app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});