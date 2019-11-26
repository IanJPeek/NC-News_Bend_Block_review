const articleRouter = require("express").Router();

const {
  getArticles,
  getSingleArticle,
  increaseArticleVotes,
  addArticleComment,
  getArticleComments,
  send405
} = require("../controllers/controllers");

articleRouter.route("/").get(getArticles).all(send405);
articleRouter
  .route("/:article_id")
  .get(getSingleArticle)
  .patch(increaseArticleVotes)
  .all(send405);
articleRouter
  .route("/:article_id/comments")
  .get(getArticleComments)
  .post(addArticleComment)
  .all(send405);

console.log("articles found")

module.exports = articleRouter;
