const articleRouter = require("express").Router();

const {
  getArticles,
  getSingleArticle,
  increaseArticleVotes,
  addArticleComment
} = require("../controllers/controllers");

articleRouter.route("/").get(getArticles);
articleRouter.route("/:article_id")
.get(getSingleArticle)
.patch(increaseArticleVotes)
articleRouter.route("/:article_id/comments")
.post(addArticleComment);

console.log("articles found")

module.exports = articleRouter;
