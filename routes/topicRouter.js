const topicRouter = require("express").Router();

const {getTopics} = require("../controllers/controllers");

topicRouter.route("/").get(getTopics)

console.log("topics found")

module.exports = topicRouter