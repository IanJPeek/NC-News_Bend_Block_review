const {
  selectTopics,
  selectUsers,
  selectArticles,
  selectComments,
  grabUser,
  grabArticle
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
  console.log ("in controller single article")
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

module.exports = {
  getTopics,
  getUsers,
  getArticles,
  getComments,
  getSingleUser,
  getSingleArticle
};