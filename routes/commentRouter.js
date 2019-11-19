const commentRouter = require("express").Router();

const { getComments, getSingleComment } = require("../controllers/controllers");

commentRouter.route("/").get(getComments);
commentRouter.route("/:comment_id").get(getSingleComment);

console.log("comments found");

module.exports = commentRouter;
