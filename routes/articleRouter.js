const articleRouter = require("express").Router();

const { getArticles } = require("../controllers/controllers");

articleRouter.route("/").get(getArticles);

console.log("articles found");

module.exports = articleRouter;
