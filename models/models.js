const connection = require ("../db/connection")

exports.selectTopics = () =>{
  return connection.select("*").from("topics")
}

exports.selectUsers = () => {
  return connection.select("*").from("users");
};

exports.selectArticles = () => {
  return connection.select("*").from("articles");
};

exports.selectComments = () => {
  return connection.select("*").from("comments");
};