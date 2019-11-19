const commentRouter = require("express").Router();

const { getComments } = require("../controllers/controllers");

commentRouter.route("/").get(getComments);

console.log("comments found");

module.exports = commentRouter;
