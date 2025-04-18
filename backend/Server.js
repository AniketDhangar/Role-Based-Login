import express from "express";
import { configDotenv } from "dotenv";
import connectToDB from "./src/config/Database.js";
import router from "./src/routes/authRoutes.js";
import cookieParser from "cookie-parser";
import adminRouter from "./src/routes/adminRoutes.js";
import cors from 'cors'

configDotenv();

const app = express();
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT || 5001;

connectToDB();
app.use(cookieParser());
app.use(router);
app.use(adminRouter);

app.use(express.static("public"));
// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
