const {
  errRoute,
  selectTopics,
  selectUsers,
  selectArticles,
  selectComments,
  grabUser,
  grabArticle,
  selectArticleComments,
  grabComment,
  adjustArticleVote,
  postNewArticleComment
} = require("../models/models");

const badRoute = (req,res,next) =>{
  console.log("bad models")
  errRoute(req).then((errReturn) => {console.log(errReturn)
  res.status(404).send({ msg: "404 Not Found - That aint a thing" });
})
}

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
  // expect the object to "have key - inc_votes, otherwise return teapot error"
  // console.log(req.body)
  // console.log(Object.keys(req.body))
  const objectKeys = Object.keys(req.body);
  // console.log(objectKeys)

  if (objectKeys.includes("inc_votes") === false) 
  
  //  not this, but why..?
  // {Promise.reject({
  //   msg: "I'm a teapot - wrong method for getting what you're after", status:418
  // })}
  
  {
  //   const teapotError = {
  //   msg: "I'm a teapot - wrong method for getting what you're after", status:418
  // }
  res
    .status(418)
    .send({msg: "I'm a teapot - wrong method for getting what you're after" });
}
if (objectKeys.length > 1) {
  res
    .status(422)
    .send({ msg: "Almost a-okay... but save your something extra" });
}
  const adjustment = req.body.inc_votes;
  adjustArticleVote(article_id, adjustment).then(update => { 
    res.status(202).send(update) 
  }).catch(next)
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
const getArticleComments =(req,res, next) => {
selectArticleComments(req.query).then(artComments => {
  res.status(200).send({artComments})
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
  addArticleComment
};