const {
  selectTopics,
  selectUsers,
  selectArticles,
  selectComments,
  grabUser,
  grabArticle,
  grabComment
} = require("../models/models");

const getTopics = (req, res, next) => {
  selectTopics(req.query)
  .then((topics) =>{
    res.status(200)
    .send({topics})
  })
}

const getUsers = (req, res, next) => {
  selectUsers(req.query)
  .then(users => {
    res.status(200)
    .send({ users });
  });
};

const getSingleUser = (req, res, next) => {
  const {username} = req.params
  grabUser(username).then(user => {
    res.status(200).send({ user });
  });
};

const getArticles = (req, res, next) => {
  selectArticles(req.query)
  .then(articles => {
    res.status(200)
    .send({ articles });
  });
};

const getSingleArticle = (req, res, next) => {
  const { article_id } = req.params;
  grabArticle(article_id).then(article => {
    res.status(200).send({ article });
  });
};

const getComments = (req, res, next) => {
  selectComments(req.query).then(comments => {
    res.status(200).send({ comments });
  });
};

const getSingleComment = (req, res, next) => {
  const { comment_id } = req.params;
  grabArticle(comment_id).then(comment => {
    res.status(200).send({ comment });
  });
};

module.exports = {
  getTopics,
  getUsers,
  getArticles,
  getComments,
  getSingleUser,
  getSingleArticle,
  getSingleComment
};