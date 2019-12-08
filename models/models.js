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
      user = user[0]
      return user;
    });
};

exports.selectArticles = (query) => {
  const { sort_by, order_by, author, topic, order } = query

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
  .orderBy(sort_by || "created_at", order_by || order || "desc")
  .returning("*")
  .then(joinedArtComms => {
    return joinedArtComms;
  });
};

exports.checkArticleExists = (article_id) => {
return connection
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", article_id)
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .count("comment_id AS comment_count")
    .groupBy("articles.article_id")
    .orderBy("articles.article_id")
    .then(article => {

      // Article does not exist ERROR
    if (article.length === 0) {
      return Promise.reject({
        msg: "No such article number!",
        status: 404
      });
    }

    // ARTICLE EXISTS but no comments - empty array return
      if (article.length>0 && +article[0].comment_count ===0){
        return Promise.reject({
          msg: [],
          status: 200
        });
      }
})
}

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
  if (adjustNumber === undefined) {
    adjustNumber = 0;
  }
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
return (
  connection
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .insert({ author: user, body: comment })
    .returning("*")
    .then(commentedArticle => {
      commentedArticle = commentedArticle[0];
      return commentedArticle;
    })
);
  };

exports.selectArticleComments = (article_id, query) => {
  const { sort_by, order_by, author, topic, order } = query;
  return connection
    .select("*")
    .from("comments")
    .where("article_id", article_id)
    .orderBy(sort_by || "created_at", order_by || order ||"desc",)
    .returning("*")
    .then(artComment => {
      if (article_id > 0 && artComment.length === 0) {
 return Promise.reject ({
          msg: "No such article number!",
          status: 404
        });
      }
      return artComment;
      })   
    }

exports.selectComments = () => {
  return connection.select("*").from("comments");
};
exports.grabComment = comment_id => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id)
    .returning("*")
    .then(comment => {comment = comment[0]; return comment})
};
exports.adjustCommentVote = (comment_id, adjustNumber) => {
  if (adjustNumber === undefined) {
    adjustNumber = 0;
  }
  return connection
    .select("*")
    .from("comments")
    .where("comment_id", comment_id)
    .increment("votes", adjustNumber)
    .returning("*")
    .then(comment => {comment = comment[0]

if (comment === undefined) {return Promise.reject({msg: "No such comment exists", status: 404})}

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
