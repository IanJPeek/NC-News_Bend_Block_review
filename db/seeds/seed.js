const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topicData)
        .returning("*");
    })
    .then(() => {
      return knex("users")
        .insert(userData)
        .returning("*");
    })
    .then(() => {
      const datedArticles = formatDates(articleData);
      return knex("articles")
        .insert(datedArticles)
        .returning("*");
    })
    .then(articles => {
      const lookup = makeRefObj(articles);
      const formattedComments = formatComments(commentData, lookup);
      return knex("comments")
        .insert(formattedComments)
        .returning("*");
    });
};
