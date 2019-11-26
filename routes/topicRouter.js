const topicRouter = require("express").Router();

const {getTopics, send405} = require("../controllers/controllers");

topicRouter
  .route("/")
  .get(getTopics)
  .all(send405);

console.log("topics found")

module.exports = topicRouter