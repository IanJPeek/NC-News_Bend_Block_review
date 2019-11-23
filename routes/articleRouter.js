const articleRouter = require("express").Router();

const {
  getArticles,
  getSingleArticle,
  increaseArticleVotes,
  addArticleComment,
  getArticleComments
} = require("../controllers/controllers");

articleRouter.route("/").get(getArticles);
articleRouter.route("/:article_id")
.get(getSingleArticle)
.patch(increaseArticleVotes)
articleRouter.route("/:article_id/comments")
.get(getArticleComments)
.post(addArticleComment);

console.log("articles found")

articleRouter.all("/*", (req, res, next) =>
  res.status(405).send({ msg: "method not allowed" })
);

module.exports = articleRouter;
