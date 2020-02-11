const {
  selectTopics,
  selectUsers,
  selectArticles,
  selectComments,
  grabUser,
  grabArticle,
  selectArticleComments,
  checkArticleExists,
  checkAuthorExists,
  checkTopicExists,
  grabComment,
  adjustArticleVote,
  postNewArticleComment,
  adjustCommentVote,
  removeComment
} = require("../models/models");
const endpointsJSON = require("../endpoints.json")

const send405 = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};

const send404 = (req, res, next) => {
  res.status(404).send({ msg: "404 Not Found - Invalid Route" });
};

const getEndpoints = (req, res, next) => {
  const endpoints = endpointsJSON;
  res.status(200).json({endpoints});
}

const getTopics = (req, res, next) => {
  selectTopics(req.query)
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  selectUsers(req.query)
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};

const getSingleUser = (req, res, next) => {
  const { username } = req.params;
  grabUser(username)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

const getArticles = (req, res, next) => {
  const { topic, author } = req.query;

  if (Object.keys(req.query).includes("topic")) {
    checkTopicExists(topic).catch(next);
  }

  if (Object.keys(req.query).includes("author")) {
    checkAuthorExists(author).catch(next);
  }

  selectArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

const getSingleArticle = (req, res, next) => {
  const { article_id } = req.params;

  grabArticle(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

const increaseArticleVotes = (req, res, next) => {
  const { article_id } = req.params;
  const objectKeys = Object.keys(req.body);

  if (objectKeys.length === 1 && objectKeys[0] !== "inc_votes") {
    res.status(418).send({
      msg: "I'm a teapot - wrong method for getting what you're after"
    });
  }

  if (objectKeys.length > 1) {
    res
      .status(422)
      .send({ msg: "Almost a-okay... but save your something extra" });
  } else {
    const adjustment = req.body.inc_votes;
    adjustArticleVote(article_id, adjustment)
      .then(update => {
        res.status(200).send(update);
      })
      .catch(next);
  }
};

const addArticleComment = (req, res, next) => {
  const objectKeys = Object.keys(req.body);

  if (objectKeys.length !== 2) {
    res
      .status(400)
      .send({ msg: "Please include username AND body in POST request" });
  }

  if (objectKeys.includes("username") === false) {
    res
      .status(400)
      .send({ msg: "Please include username AND body in POST request" });
  } else {
    const { article_id } = req.params;

    if (article_id > 0) {
      const user = req.body.username;
      const comment = req.body.body;

      selectArticleComments(article_id, req.query)
        .then(comments => {
          if (comments.length === 0) {
            res.status(422).send({ msg: "No such article number" });
          }
        })
        .catch(next);

      postNewArticleComment(article_id, user, comment)
        .then(comment => {
          res.status(201).send({ comment });
        })
        .catch(next);
    } else {
      res.status(400).send({ msg: "Invalid article_id - must be a number" });
    }
  }
};

const getArticleComments = (req, res, next) => {
  const { article_id } = req.params;

  checkArticleExists(article_id, req.query).catch(next);

  selectArticleComments(article_id, req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const getComments = (req, res, next) => {
  selectComments(req.query)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const getSingleComment = (req, res, next) => {
  const { comment_id } = req.params;
  grabComment(comment_id)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

const increaseCommentVotes = (req, res, next) => {
  const { comment_id } = req.params;
  const adjustment = req.body.inc_votes;
  adjustCommentVote(comment_id, adjustment)
    .then(update => {
      res.status(200).send(update);
    })
    .catch(next);
};
const deleteCommentByID = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};

module.exports = {
  send404,
  send405,
  getEndpoints,
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
