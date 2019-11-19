const {selectTopics, selectUsers, selectArticles, selectComments} = require("../models/models")

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

const getArticles = (req, res, next) => {
  selectArticles(req.query)
  .then(articles => {
    res.status(200)
    .send({ articles });
  });
};

const getComments = (req, res, next) => {
  selectComments(req.query).then(comments => {
    res.status(200).send({ comments });
  });
};

module.exports = { getTopics, getUsers, getArticles, getComments };