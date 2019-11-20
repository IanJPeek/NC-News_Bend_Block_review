const connection = require("../db/connection");

exports.selectTopics = () => {
  return connection.select("*").from("topics");
};

exports.selectUsers = () => {
  return connection.select("*").from("users");
};
exports.grabUser = username => {
  return connection
    .select("*")
    .from("users")
    .where("username", username)
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({
          msg: "Bad Request - Invalid user ID",
          status: 404
        });
      }
      return user;
    });
};

exports.selectArticles = () => {
  return connection.select("*").from("articles");
};
exports.grabArticle = article_id => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({msg: "Bad Request - Invalid article number", status: 404})
      }
      return article
    });
};
exports.adjustArticleVote = (article_id, adjustNumber) => {
  return connection.select("*").from("articles")
  .where("article_id", article_id)  
  .increment("votes", adjustNumber)
  .returning("*")
  .then(article =>{
    return {article, msg: "Votes recounted"}
  })
}
exports.postNewArticleComment = (article_id, user, comment) => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .insert({ title: "thoughts", author: user, body: comment })
    .returning("*")
    .then(newCommentedArticle =>{
      // console.log(newCommentedArticle)
      return { newCommentedArticle };
    });
}

exports.selectComments = () => {
  return connection.select("*").from("comments");
};
exports.grabComment = comment_id => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id);
};
