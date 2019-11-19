const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');

const { formatDates, formatComments, makeRefObj } = require('../utils/utils');

exports.seed = function(knex) {
  // const topicsInsertions = knex('topics').insert(topicData);
  // const usersInsertions = knex('users').insert(userData);

  return (
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => {
        return knex("topics")
          .insert(topicData)
          .returning("*");
        // const insertedTopics =knex('topics')
      })
      // .then((topics) => {
      // console.log(topics, "see topics...")
      // })
      .then(() => {
        // const insertedUsers = knex('users')
        return knex("users")
          .insert(userData)
          .returning("*");
      })
      // .then((users) => {
      //   console.log(users, "see users")
      // })
      .then(() => {
        const datedArticles = formatDates(articleData);
        return knex("articles")
          .insert(datedArticles)
          .returning("*");
      })
      // .then(articles => {
      //   console.log(articles, "see the (dated) articles");
      // })
      .then((articles) => {
        const lookup = makeRefObj(articles);
        const formattedComments = formatComments(commentData, lookup);
        // console.log(formattedComments)
        return knex("comments")
        .insert(formattedComments)
        .returning("*")
      })
  );


}

  // return Promise.all([topicsInsertions, usersInsertions])
  //   .then(() => {
  //     /* 
      
  //     Your article data is currently in the incorrect format and will violate your SQL schema. 
      
  //     You will need to write and test the provided formatDate utility function to be able insert your article data.

  //     Your comment insertions will depend on information from the seeded articles, so make sure to return the data after it's been seeded.
  //     */
  //   })
  //   .then(articleRows => {
      /* 

      Your comment data is currently in the incorrect format and will violate your SQL schema. 

      Keys need renaming, values need changing, and most annoyingly, your comments currently only refer to the title of the article they belong to, not the id. 
      
      You will need to write and test the provided makeRefObj and formatComments utility functions to be able insert your comment data.
      */

    //   const articleRef = makeRefObj(articleRows);
    //   const formattedComments = formatComments(commentData, articleRef);
    //   return knex('comments').insert(formattedComments);
    // });
