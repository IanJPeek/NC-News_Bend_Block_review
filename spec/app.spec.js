process.env.NODE_ENV = "test";

const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");
const connection = require("../db/connection");

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

  describe('/*', () => {
    xit('Error handles an invalid route with a 404 response', () => {return request(app)
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
            console.log(body.user);
            expect(body.user[0].username).to.eql("lurker");
          });
      });
    });

    it("ERROR HANDLES - GET for an invalid user_id - status:404 and error message", () => {
      return request(app)
        .get("/api/users/bogusID")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Bad Request - Invalid user ID");
        });
    });
  });

  describe("/articles", () => {
    it("GET:200, responds with an array of articles", () => {
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
            "created_at"
          );
        });
    });

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
              "invalid (bad) article request - numbers only"
            );
          });
      });

      xit("Responds to a patch request to increase the number of votes", () =>{
        return request (app)
        .patch("/api/articles/7")
        .send({inc_votes:1})
        .expect(202)

        .then(({body}) => {
          console.log(body)
          expect(body.msg).to.equal("Votes recounted");
          expect(body.article[0]).to.eql({
            article_id: 7,
            title: "Z",
            body: "I was hungry.",
            votes: 1,
            topic: "mitch",
            author: "icellusedkars",
            created_at: new Date(785420514171)
          });
        })
      })

      // it.only("Responds to a patch request to increase the number of votes with a larger increase", () => {
      //   return request(app)
      //     .patch("/api/articles/7")
      //     .send({ inc_votes: 100 })
      //     .expect(202)

      //     .then(({ body }) => {
      //       console.log(body);
      //       expect(body.msg).to.equal("Votes recounted");
      //       expect(body.article[0]).to.eql({
      //         article_id: 7,
      //         title: "Z",
      //         body: "I was hungry.",
      //         votes: 100,
      //         topic: "mitch",
      //         author: "icellusedkars",
      //         created_at: new Date(785420514171)
      //       });
      //     });
      //doesn't seem to increase votes by 100 - still only 1?
      // });
    // });

    it.only("Responds to a post comment request with an appropriate status and the posted comment", () => {
      return request(app)
        .post("/api/articles/4/comments")
        .send({
          username: "butter_bridge",
          body: "My thoughts exactly! -Exactly the entire opposite."
        })
        .expect(201)
        .then(({ body }) => {
        console.log(body.commentedArticle.newCommentedArticle[0]);
          // expect(
          //   body.commentedArticle.newCommentedArticle[0].to.contain({
          //     article_id: 13,
          //     title: "misc",
          //     body: "My thoughts exactly! -Exactly the entire opposite.",
          //     votes: 0,
          //     topic: null,
          //     author: "butter_bridge"
          //     //created_at: "2019-11-20T14:30:01.506Z"
          //   })
          // );
        })
    })
        
    });
  });

  describe("/comments", () => {
    it("GET:200, responds with an array of comments", () => {
      return request(app)
        .get("/api/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments[0]).to.contain.keys(
            "comment_id",
            "author",
            "article_id",
            "votes",
            "body",
            "created_at"
          );
        });
    });

    describe("/comments", () => {
      it("GET:200, /:comment_id responds with the requested comment", () => {
        return request(app)
          .get("/api/comments/11")
          .expect(200)
          .then(({ body }) => {
            console.log(body)
            expect(body.comment[0].body).to.eql("Ambidextrous marsupial");
          });
      });
    });
  });
});
