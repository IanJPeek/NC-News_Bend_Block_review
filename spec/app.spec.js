process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const { expect } = require("chai");
const chai = require("chai");
const chaiSorted = require("chai-sorted");
const connection = require("../db/connection");

chai.use(chaiSorted);

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/topics", () => {
    it("GET:200, responds with an array of topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body.topics[0]).to.contain.keys("description", "slug");
        });
    });
  });

  describe("/*", () => {
    //seems not to take route?
    // better/ simpler way to error handle this?
    xit("Error handles an invalid route with a 404 response", () => {
      return request(app)
        .get("/api/anyOldThingYouDontGot")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("404 Not Found - That aint a thing");
        });
    });
  });

  describe("/users", () => {
    it("GET:200, responds with an array of users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users[0]).to.contain.keys(
            "username",
            "name",
            "avatar_url"
          );
        });
    });
    describe("/users", () => {
      it("GET:200, /:username responds with the requested user", () => {
        return request(app)
          .get("/api/users/lurker")
          .expect(200)
          .then(({ body }) => {
            expect(body.user[0].username).to.eql("lurker");
          });
      });
    });

    //why two responses... PSQL & custom?
    it("ERROR HANDLES - GET for an invalid user_id - status:404 and error message", () => {
      return request(app)
        .get("/api/users/bogusID")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Bad Request - Invalid user ID");
        });
    });
  });

  //ARTICLES
  describe("/articles", () => {
    it("GET:200, responds with an array of articles, default sorted by date from the earliest", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0]).to.contain.keys(
            "article_id",
            "title",
            "body",
            "topic",
            "author",
            "created_at",
            "comment_count"
          );
          expect(body.articles[0]).to.eql({
             article_id: 12,
             title: 'Moustache',
             body: 'Have you seen the size of that thing?',
             votes: 0,
             topic: 'mitch',
             author: 'butter_bridge',
             created_at: "1974-11-26T12:21:54.171Z",
             comment_count: '0'
          })
          expect(body.articles[1]).to.eql({
          article_id: 11,
          title: 'Am I a cat?',
          body: 'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
          votes: 0,
          topic: 'mitch',
          author: 'icellusedkars',
          created_at: "1978-11-25T12:21:54.171Z",
          comment_count: '0'
         })
        });
      });
      it('will accept queries ', () => {
        
      });

    //should accept queries...

    describe("/articles", () => {
      it("GET:200, /:article_id responds with the requested article", () => {
        return request(app)
          .get("/api/articles/4")
          .expect(200)
          .then(({ body }) => {
            expect(body.article[0].topic).to.eql("mitch");
          });
      });
      it("ERROR HANDLES - returns a PSQL error code & handles this when given a string but expecting an article ID number", () => {
        return request(app)
          .get("/api/articles/someArticleIWannaRead")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "invalid (bad) request - ids: numbers only; votes: I need your number, no strings ;)"
            );
          });
      });

      it("GET:200, for a specific article responds with that articles, including a comment count key/ value pair", () => {
        return request(app)
          .get("/api/articles/5")
          .expect(200)
          .then(({ body }) => {console.log(body)
            expect(body.article[0]).to.contain.keys(
              "article_id",
              "title",
              "body",
              "topic",
              "author",
              "created_at",
              "comment_count",
              "votes"
            );
          });
      });

      // implement "comment count"...

      it("ERROR HANDLES - returns a PSQL error code & handles this for an article that doesn't exist (eg number too high)", () => {
        return request(app)
          .get("/api/articles/10000000000")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "No such article found - MUCH lower number please!"
            );
          });
      });
      // ignore error test? - marginally too high number handled in the same way as non-existent number/ string?...

      // it.only("ERROR HANDLES - returns a 404 error code for an article that don't exist (where number is too high, but not ridiculously so...)", () => {
      //   return request(app)
      //     .get("/api/articles/324")
      //     .expect(404)
      //     .then(({ body }) => {
      //       expect(body.msg).to.equal(
      //         "No such article found - slightly lower number please!"
      //       );
      //     });
      // });

      it("Responds to a patch request to increase the number of votes", () => {
        // why would a faulty request increment by 1/ pass the test?
        return request(app)
          .patch("/api/articles/7")
          .send({ inc_votes: 1 })
          .expect(202)

          .then(({ body }) => {
            expect(body.msg).to.equal("Votes recounted");
            expect(body.article[0]).to.eql({
              article_id: 7,
              title: "Z",
              body: "I was hungry.",
              votes: 1,
              topic: "mitch",
              author: "icellusedkars",
              created_at: "1994-11-21T12:21:54.171Z"
            });
          });
      });

      it("Responds to a patch request to increase the number of votes with a larger increase", () => {
        return request(app)
          .patch("/api/articles/7")
          .send({ inc_votes: 100 })
          .expect(202)

          .then(({ body }) => {
            console.log(body);
            expect(body.msg).to.equal("Votes recounted");
            expect(body.article[0]).to.eql({
              article_id: 7,
              title: "Z",
              body: "I was hungry.",
              votes: 100,
              topic: "mitch",
              author: "icellusedkars",
              created_at: "1994-11-21T12:21:54.171Z"
            });
          });
      });

      it("Responds to a patch request to increase the number of votes by a negative quantity", () => {
        return request(app)
          .patch("/api/articles/7")
          .send({ inc_votes: -50 })
          .expect(202)

          .then(({ body }) => {
            console.log(body);
            expect(body.msg).to.equal("Votes recounted");
            expect(body.article[0]).to.eql({
              article_id: 7,
              title: "Z",
              body: "I was hungry.",
              votes: -50,
              topic: "mitch",
              author: "icellusedkars",
              created_at: "1994-11-21T12:21:54.171Z"
            });
          });
      });

      //why two error responses?
      it("ERROR HANDLES - returns a 404 for an attempt to PATCH the number of votes for an invalid article /id number which does not exist", () => {
        return request(app)
          .patch("/api/articles/4003/")
          .send({ inc_votes: 1 })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request - Invalid article number");
          });
      });

      it("ERROR HANDLES - returns a 418: 'I'm a teapot' for an attempt to PATCH the number of votes which doesn't include an 'inc_votes' key in the sent object", () => {
        return request(app)
          .patch("/api/articles/6/")
          .send({ change_votes: 1 })
          .expect(418)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "I'm a teapot - wrong method for getting what you're after"
            );
          });
      });

      it("ERROR HANDLES - (with PSQL)rejects an object which includes an 'inc_votes' key, but doesn't have a number as its property ", () => {
        return request(app)
          .patch("/api/articles/2/")
          .send({ inc_votes: "twenty-six" })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "invalid (bad) request - ids: numbers only; votes: I need your number, no strings ;)"
            );
          });
      });

      /*
Some other property on request body (e.g. { inc_votes : 1, name: 'Mitch' })
    */
      // is the below dangerous to allow? - 'dodgy'/ malicious insertions?
      it("ERROR HANDLES - rejects an object which includes a correct 'inc_votes' key/ value pair, but also provides additional keys or properties ", () => {
        return request(app)
          .patch("/api/articles/5/")
          .send({ inc_votes: 12000, bribe: "£1,000,000" })
          .expect(422)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "Almost a-okay... but save your something extra"
            );
          });
      });

      it("Responds to a POST comment request with an appropriate status and the posted comment", () => {
        return request(app)
          .post("/api/articles/4/comments")
          .send({
            username: "butter_bridge",
            body: "My thoughts exactly! -Exactly the entire opposite."
          })
          .expect(201)
          .then(({ body }) => {
            // clunky body. ... quick way to shorten?
            console.log(body.commentedArticle.newCommentedArticle[0]);
          });
        // how to pass below test with 'created at - now...?'
        // expect(
        //   body.commentedArticle.newCommentedArticle[0]).to.eql({
        //     article_id: 13,
        //     title: "thoughts",
        //     body: "My thoughts exactly! -Exactly the entire opposite.",
        //     votes: 0,
        //     topic: null,
        //     author: "butter_bridge",
        //     created_at: '2019-11-21T06:27:53.026Z'
        //   });
      });

      //POST error-handling

      // new/ unrecognised user?
      // default-fill title so not "null"?
      // responds when article-id does not exist - no. is too high...

      it("GET:200, responds to a GET request for all comments on a given article_id with an array of comments", () => {
        return request(app)
          .get("/api/articles/:article_id/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.artComments.artComment[0]).to.contain.keys(
              "comment_id",
              "votes",
              "body",
              "author", //which is username from the users table
              "created_at"
            );
          });
      });
     
      // passes individually (.only), but fails when run as part of test-suite??
      it("GET:200, responds to a GET request with an array of comments default sorted by most recently created", () => {
        return request(app)
          .get("/api/articles/5/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.artComments.artComment[0]).to.eql({
              comment_id: 1,
              author: "butter_bridge",
              article_id: 9,
              votes: 16,
              created_at: "2017-11-22T12:36:03.389Z",
              body:
                "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!"
            });
            expect(body.artComments.artComment[1]).to.eql({
              comment_id: 2,
              author: "butter_bridge",
              article_id: 1,
              votes: 14,
              created_at: "2016-11-22T12:36:03.389Z",
              body:
                "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky."
            });
          });
      });
      // check if .length = expected no. of article comments...

      //QUERY error-handling
      // Bad queries:
      // sort_by a column that doesn't exist
      // order !== "asc" / "desc"
      // author / topic that is not in the database
      // author / topic that exists but does not have any articles associated with it
    });
  });

  // COMMENTS
  describe("/comments", () => {
    it("GET:200, /:comment_id responds with the requested comment", () => {
      return request(app)
        .get("/api/comments/11")
        .expect(200)
        .then(({ body }) => {
          expect(body.comment[0].body).to.eql("Ambidextrous marsupial");
        });
    });
  });
});



// TO SORT - GET /api/articles accepts queries
//  Error-handling...

//  DELETE