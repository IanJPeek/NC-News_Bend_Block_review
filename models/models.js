const connection = require("../db/connection");

exports.errRoute = () => {
  // console.log("bad control");
  return {
    msg: "Bad Request - Invalid user ID",
    status: 404
  };
};

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
      user = user[0]
      return user;
    });
};

exports.checkArticleExists = query => {
  const {topic} = query
  if (topic !== "mitch" || "cats" || "paper") {
    return Promise.reject({status: 404, msg: "Not Found - That aint a thing"})
  }
 return (query)}

exports.selectArticles = (query) => {
  const { sort_by, order_by, author, topic } = query
  // console.log(sort_by);
// if (topic !== "mitch" || "cats" || "paper")
// {checkArticleExists(topic)}
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .count("comment_id AS comment_count")
    .groupBy("articles.article_id")
    .modify(query => {
      if (author) query.where("articles.author", author);
      if (topic) query.where("articles.topic", topic);
    })
    .orderBy(sort_by || "created_at", order_by || "desc")
    .returning("*")
    .then(joinedArtComms => {
      return joinedArtComms;
    });
};

exports.grabArticle = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .count("comment_id AS comment_count")
    .groupBy("articles.article_id")
    .orderBy("articles.article_id")
    .then(article => {
      // console.log(article)
      if (article.length === 0) {
        return Promise.reject({
          msg: "Bad Request - Invalid article number",
          status: 404
        });
      }
      return article[0];
    });
};
exports.adjustArticleVote = (article_id, adjustNumber) => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .increment("votes", adjustNumber)
    .returning("*")
    .then(article => {
      if (article.length === 0) {
        return Promise.reject({
          msg: "Bad Request - Invalid article number",
          status: 404
        });
      }
      if (typeof adjustNumber !== "number") {
        return Promise.reject({
          msg: "I need your number, no strings ;)",
          status: 422
        });
      }
      article = article[0]
      return { article, msg: "Votes recounted" };
    });
};
exports.postNewArticleComment = (article_id, user, comment) => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .insert({ title: "thoughts", author: user, body: comment })
    .returning("*")
    .then(commentedArticle => {
      commentedArticle = commentedArticle[0]
      return commentedArticle;
    });
};
exports.selectArticleComments = (article_id, query) => {
  const { sort_by, order_by, author, topic } = query;
  return connection
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by || "created_at", order_by ||"desc")
    .returning("*")
    .then(artComment => {
      return artComment;
    });
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
exports.adjustCommentVote = (comment_id, adjustNumber) => {
  // console.log(adjustNumber, "adjustNumber");
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id)
    .increment("votes", adjustNumber)
    .returning("*")
    .then(comment => {
      return { comment, msg: "Votes recounted" };
    });
};
exports.removeComment = (comment_id) => {
  return connection('comments').where({comment_id})
  .del()
  .then((rowsDeleted) => {
    if (rowsDeleted === 0) {
      return Promise.reject({
        status: 404,
        msg: "comment not found"
      })
    }
    return rowsDeleted
  })
}
