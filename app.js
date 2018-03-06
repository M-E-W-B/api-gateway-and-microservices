const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { isURL } = require("validator");
const { Url } = require("./models");

const btoa = require("btoa");
const atob = require("atob");

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

app.post("/shorten", async (req, res, next) => {
  const { url } = req.body;
  const isValid = isURL(url);

  // can be within schema
  if (!isValid) return next(new Error("Invalid Url"));

  // encoded url
  const slug = btoa(url);
  const options = {
    new: true,
    upsert: true
  };

  const result = await Url.findOneAndUpdate(
    { url },
    { url, slug, $inc: { count: 1 } },
    options
  );

  res.json(result);
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "dev") {
    console.error(err.stack);
    res.json({ message: err.message });
  } else res.json(Object.keys(err).length ? err : { message: err.message });
});

module.exports = app;
