const commentRouter = require("express").Router();

const {
  getComments,
  getSingleComment,
  increaseCommentVotes,
  deleteCommentByID,
  send405
} = require("../controllers/controllers");

commentRouter
  .route("/")
  .get(getComments)
  .all(send405)
commentRouter
  .route("/:comment_id")
  .get(getSingleComment)
  .patch(increaseCommentVotes)
  .delete(deleteCommentByID)
  .all(send405);

console.log("comments found");

module.exports = commentRouter;
