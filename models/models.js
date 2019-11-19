const connection = require ("../db/connection")

exports.selectTopics = () =>{
  return connection.select("*").from("topics")
}

exports.selectUsers = () => {
  return connection.select("*").from("users");
};
exports.grabUser = (username) =>{
  return connection.select("*").from("users").where("username", username)
}

exports.selectArticles = () => {
  return connection.select("*").from("articles");
};
exports.grabArticle = (article_id) => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id);
};

exports.selectComments = () => {
  return connection.select("*").from("comments");
};
exports.grabComment = comment_id => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id);
};