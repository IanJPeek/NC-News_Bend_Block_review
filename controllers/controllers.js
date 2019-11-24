const {
  errRoute,
  selectTopics,
  selectUsers,
  selectArticles,
  selectComments,
  grabUser,
  grabArticle,
  selectArticleComments,
  checkArticleExists,
  grabComment,
  adjustArticleVote,
  postNewArticleComment,
  adjustCommentVote,
  removeComment
} = require("../models/models");

const badRoute = (req,res,next) =>{
  console.log("bad models")
  errRoute(req)
    .then(errReturn => {
      console.log(errReturn);
      res.status(404).send({ msg: "404 Not Found - That aint a thing" });
    })
    .catch(next);
}

const getTopics = (req, res, next) => {
  selectTopics(req.query)
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
}

const getUsers = (req, res, next) => {
  selectUsers(req.query)
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
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
      res.status(200).send({ articles });
    })
    .catch(next);
};
const getSingleArticle = (req, res, next) => {
  const { article_id } = req.params;
  grabArticle(article_id).then(article => {
    res.status(200).send({article});
  }).catch(next)
};
const increaseArticleVotes = (req,res,next) => {
  const { article_id } = req.params;
  
  const objectKeys = Object.keys(req.body);

  if (objectKeys.includes("inc_votes") === false) {
  res.status(418)
  .send({msg: "I'm a teapot - wrong method for getting what you're after" });
  }

  if (objectKeys.length > 1) {
  res
    .status(422)
    .send({ msg: "Almost a-okay... but save your something extra" });
}
  else{const adjustment = req.body.inc_votes;
  adjustArticleVote(article_id, adjustment).then(update => { 
    res.status(202).send(update) 
  }).catch(next)}
}

const addArticleComment = (req,res,next) => {

const objectKeys = Object.keys(req.body);

if (objectKeys.includes("username") === false) {
  res
    .status(400)
    .send({ msg: "Please include username AND body in POST request" });
  }
  else{

const { article_id } = req.params;

// if (typeof article_id !== "number")

const user = req.body.username;
const comment = req.body.body
postNewArticleComment(article_id, user, comment)
.then(comment => {
  res.status(201).send({comment})
}).catch(next)}
}

const getArticleComments =(req,res, next) => {
  const {article_id} = req.params;

  if (typeof article_id !== "number")
  
    selectArticleComments(article_id, req.query)
      .then(comments => {
        res.status(200).send({ comments });
      })
      .catch(next);
}

const getComments = (req, res, next) => { 
  selectComments(req.query).then(comments => {
    res.status(200).send({ comments });
  }).catch(next)
};
const getSingleComment = (req, res, next) => {
  const { comment_id } = req.params;
  grabComment(comment_id).then(comment => {
    res.status(200).send({ comment });
  }).catch(next)
}
const increaseCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const adjustment = req.body.inc_votes;
  adjustCommentVote(comment_id, adjustment).then(update => { 
    res.status(200).send(update) 
  }).catch(next)
}
const deleteCommentByID = (req,res, next) => {
const {comment_id} = req.params;
console.log(comment_id)
removeComment(comment_id).then( () => {console.log("deleting");res.status(204).send()}).catch(next)
}

module.exports = {
  badRoute,
  getTopics,
  getUsers,
  getArticles,
  getArticleComments,
  getComments,
  getSingleUser,
  getSingleArticle,
  getSingleComment,
  increaseArticleVotes,
  addArticleComment,
  increaseCommentVotes,
  deleteCommentByID
};