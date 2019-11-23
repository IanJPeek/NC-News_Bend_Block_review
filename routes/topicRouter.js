const topicRouter = require("express").Router();

const {getTopics} = require("../controllers/controllers");

topicRouter.route("/").get(getTopics)

console.log("topics found")

topicRouter.all("/*", (req, res, next) =>
  res.status(405).send({msg: "method not allowed"})
);

module.exports = topicRouter