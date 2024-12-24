require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerDocs = require("./swagger");
const errorMiddleware = require("./middlewares/errorMiddleware");
const router = require("./routes/index");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
const PORT = 5000;
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://yaroslavivanov2005:${process.env.PASSWORD}@arkpz.scpri.mongodb.net/?retryWrites=true&w=majority&appName=arkpz`
    );

    swaggerDocs(app, PORT);

    app.listen(PORT, () => {
      console.log(`Server started on PORT ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};
start();
