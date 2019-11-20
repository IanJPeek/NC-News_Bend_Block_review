const {
  selectTopics,
  selectUsers,
  selectArticles,
  selectComments,
  grabUser,
  grabArticle,
  grabComment,
  adjustArticleVote,
  postNewArticleComment
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
  }).catch(next);
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
  }).catch(next)
};
const increaseArticleVotes = (req,res,next) => {
  const { article_id } = req.params;
  const adjustment = req.inc_votes
  adjustArticleVote(article_id, adjustment).then(update => { 
    res.status(202).send(update) //check...
  })
}
const addArticleComment = (req,res,next) => {
const { article_id } = req.params;
const user = req.body.username;
const comment = req.body.body
postNewArticleComment(article_id, user, comment)
.then(commentedArticle => {
  res.status(201).send({commentedArticle})
})
}

const getComments = (req, res, next) => { 
  selectComments(req.query).then(comments => {
    res.status(200).send({ comments });
  });
};
const getSingleComment = (req, res, next) => {
  const { comment_id } = req.params;
  grabComment(comment_id).then(comment => {
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
  getSingleComment,
  increaseArticleVotes,
  addArticleComment
};