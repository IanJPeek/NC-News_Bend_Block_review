const commentRouter = require("express").Router();

const {
  getComments,
  getSingleComment,
  increaseCommentVotes,
  deleteCommentByID
} = require("../controllers/controllers");

commentRouter.route("/").get(getComments);
commentRouter
  .route("/:comment_id")
  .get(getSingleComment)
  .patch(increaseCommentVotes)
  .delete(deleteCommentByID);


console.log("comments found");

commentRouter.all("/*", (req, res, next) =>
  res.status(405).send({ msg: "method not allowed" })
);

module.exports = commentRouter;
