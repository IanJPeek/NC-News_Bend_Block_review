const articleRouter = require("express").Router();

const { getArticles, getSingleArticle } = require("../controllers/controllers");

articleRouter.route("/").get(getArticles);
articleRouter.route("/:article_id").get(getSingleArticle);

console.log("articles found");

module.exports = articleRouter;
