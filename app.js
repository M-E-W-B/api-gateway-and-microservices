const express = require("express");
const httpProxy = require("express-http-proxy");
const config = require("./config");

const app = express();
const router = express.Router();

const urlShortnerServiceProxy = httpProxy(config.microservices.urlShortner);
const urlShortnerStatsServiceProxy = httpProxy(
  config.microservices.urlShortnerStats
);

// Authentication
app.use((req, res, next) => {
  // authentication logic will be here
  next();
});

app.use("/service", router);

router.post("/url-shorten", (req, res, next) => {
  // Proxy request to url shortner microservice
  urlShortnerServiceProxy(req, res, next);
});

router.get("/url-shorten-stats", (req, res, next) => {
  // Proxy request to url shortner stats microservice
  urlShortnerStatsServiceProxy(req, res, next);
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "dev") {
    console.error(err.stack);
    res.json({ message: err.message });
  } else res.json(Object.keys(err).length ? err : { message: err.message });
});

module.exports = app;
