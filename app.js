const express = require("express");
const mongoose = require("mongoose");
const { Url } = require("./models");

const app = express();
const router = express.Router();

app.use("/", router);

app.get("/stats", async (req, res, next) => {
  const result = await Url.find();
  res.json(result);
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "dev") {
    console.error(err.stack);
    res.json({ message: err.message });
  } else res.json(Object.keys(err).length ? err : { message: err.message });
});

module.exports = app;
