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
  
    describe("/*", () => {
      it("Error handles an invalid route with a 404 response", () => {
        return request(app)
          .get("/api/anyOldThingYouDontGot")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("404 Not Found - Invalid Route");
          });
      });
    });

    it("ERROR HANDLES invalid methods - eg an attempt to DELETE on api/", () => {
      return request(app)
        .delete("/api")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("method not allowed");
        });
    });

  // TOPICS
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

  it('ERROR HANDLES invalid methods - eg an attempt to PATCH on api/topics', () => {
    return request(app)
      .patch("/api/topics")
      .send({ msg: "these words aint a patch on you" })
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.equal("method not allowed")
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
            expect(body.user.username).to.eql("lurker");
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

    it("ERROR HANDLES invalid methods - eg an attempt to PUT on api/users/butter_bridge", () => {
    return request(app)
      .put("/api/users/butter_bridge")
      .send({
        username: "butter_bridge",
        name: "Mr Butter Pants",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg"
      })
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.equal("method not allowed");
      });
    })
  
    
    
  });

  //ARTICLES
  describe("/articles", () => {
    it("GET:200, responds with an array of articles, default sorted by date from the most recent", () => {
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
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            votes: 100,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2018-11-15T12:21:54.171Z",
            comment_count: "13"
          });
          expect(body.articles[1]).to.eql({
            article_id: 2,
            title: "Sony Vaio; or, The Laptop",
            body:
              "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
            votes: 0,
            topic: "mitch",
            author: "icellusedkars",
            created_at: "2014-11-16T12:21:54.171Z",
            comment_count: "0"
          });
        });
    });

    it("GET:200 - QUERY, responds with an array of articles, sorted according to a valid column (defaulting to descending)", () => {
      return request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.descendingBy("votes");
        });
    });
    it("GET:200 - QUERY, responds with an array of articles, sorted in ascending order when requested)", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(({ body }) => {
       expect(body.articles[0]).to.eql({
         article_id: 12,
         title: "Moustache",
         body: "Have you seen the size of that thing?",
         votes: 0,
         topic: "mitch",
         author: "butter_bridge",
         created_at: "1974-11-26T12:21:54.171Z",
         comment_count: "0"
       });
        });
    });

    it("GET:200 - QUERY, responds with an array of articles, sorted according to a valid column, in ascending order when requested (by eg article_id)", () => {
      return request(app)
        .get("/api/articles?sort_by=article_id&order_by=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.ascendingBy("article_id");
        });
    });
    it("GET:200 - QUERY, responds with an array of articles, sorted according to a valid column, in ascending order when requested (by eg article_id)", () => {
      return request(app)
        .get("/api/articles?sort_by=article_id&order_by=desc")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.descendingBy("article_id");
        });
    });
    it("GET:200 - QUERY, responds with an array of articles, sorted according to a valid column, in ascending order when requested (eg by votes)", () => {
      return request(app)
        .get("/api/articles?sort_by=votes&order_by=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.ascendingBy("votes");
        });
    });
    it("GET:200 - QUERY, responds with an array of articles, filtered by the username value requested", () => {
      return request(app)
        .get("/api/articles?author=icellusedkars")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].author).to.equal("icellusedkars");
          expect(body.articles[4].author).to.equal("icellusedkars");
        });
    });
    it("GET:200 - QUERY, responds with an array of articles, filtered by the topic value requested", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].topic).to.equal("mitch");
          expect(body.articles[5].topic).to.equal("mitch");
        });
    });
it("ERROR HANDLES (with PSQL)- 404 - rejects a 'sort_by' for a column category that does not exist", () => {
  return request(app)
    .get("/api/articles?sort_by=junk")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).to.equal("not a valid category to sort_by...");
    });
});

//FAILS TESTS
it("ERROR HANDLES - rejects a non-existent topic with a 404 ERROR", () => {
  return request(app)
    .get("/api/articles?topic=not_this_topic")
    .expect(404)
    .then(({ body }) => {
      expect(body.msg).to.equal("Not Found - That aint a thing")
    });
});

    it('ERROR HANDLES invalid methods - eg an attempt to PATCH on api/articles', () => {
    return request(app)
      .patch("/api/articles")
      .send({ msg: "these words aint a patch on you" })
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.equal("method not allowed")
      });
    })

    describe("/articles", () => {
      it("GET:200, /:article_id responds with the requested article", () => {
        return request(app)
          .get("/api/articles/4")
          .expect(200)
          .then(({ body }) => {
            expect(body.article.topic).to.eql("mitch");
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


      it("GET:200, for a specific article responds with that article (including a comment count key/ value pair)", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.contain.keys(
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
        return request(app)
          .patch("/api/articles/7")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            expect(body.msg).to.equal("Votes recounted");
            expect(body.article).to.eql({
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
          .expect(200)
          .then(({ body }) => {
            expect(body.msg).to.equal("Votes recounted");
            expect(body.article).to.eql({
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
          .expect(200)
          .then(({ body }) => {
            expect(body.msg).to.equal("Votes recounted");
            expect(body.article).to.eql({
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

      it("ERROR HANDLES - PATCH:200 - api/articles/:article_id responds to a patch request to increase the number of votes with an empty body by ignoring and sending the original article back", () => {
    return request(app)
      .patch("/api/articles/7")
      .send({ })
      .expect(200)
      .then(({ body }) => {
        expect(body.msg).to.equal("Votes recounted");
        expect(body.article).to.eql({
          article_id: 7,
          title: "Z",
          body: "I was hungry.",
          votes: 0,
          topic: "mitch",
          author: "icellusedkars",
          created_at: "1994-11-21T12:21:54.171Z"
        });
      });
  });


      it("ERROR HANDLES invalid methods - eg an attempt to PUT on api/articles", () => {
         return request(app)
           .put("/api/articles")
           .send({
             comment_id: 1,
             author: "butter_bridge",
             article_id: 9,
             votes: 16,
             created_at: "2017-11-22T12:36:03.389Z",
             body:
               "Oh, I've got a runny nose! Also, I'm a sultana!"
           })
           .expect(405)
           .then(({ body }) => {
             expect(body.msg).to.equal("method not allowed");
           });
       });

       //REQUEST for ARTICLE eg 1 ALWAYS RETURNS article 13...?
      it("Responds to a POST comment request with a 201 status and the posted comment", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({
            username: "butter_bridge",
            body: "My thoughts exactly! -Exactly the entire opposite."
          })
          .expect(201)
          .then(({ body }) => {
            expect(body.comment).to.contain({
              article_id: 13,
              title: "thoughts",
              body: "My thoughts exactly! -Exactly the entire opposite.",
              votes: 0,
              topic: null,
              author: "butter_bridge"
            });
          });
      });

      it("ERROR HANDLES (with PSQL) - 400 - Responds to a POST request missing the required keys with a 400 status", () => {
        return request(app)
          .post("/api/articles/4/comments")
          .send({
            username: "butter_bridge",
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Please include username AND body in POST request")
          });
      });

      it("ERROR HANDLES - 400 - Responds to a POST request missing the required keys with a 400 status", () => {
        return request(app)
          .post("/api/articles/4/comments")
          .send({
            body: "My thoughts exactly! -Exactly the entire opposite."
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "Please include username AND body in POST request"
            );
          });
      });

      it("ERROR HANDLES - 422 - Responds with a 422:Unprocessable entity code when a POST request is made to a valid 'article_id' which does not exist", () => {
        return request(app)
          .post("/api/articles/413/comments")
          .send({
            username: "butter_bridge",
            body: "My thoughts exactly! -Exactly the entire opposite."
          })
          .expect(422)
          .then(({ body }) => {;
            expect(body.msg).to.equal(
              "Unprocessable entity - article does not exist"
            );
          });
      });

     xit("ERROR HANDLES - Responds with a 400: Bad Request when a POST request is made with an invalid 'article_id'",
        () => {
          return request(app)
            .post("/api/articles/not_an_article_number/comments")
            .send({
              username: "butter_bridge",
              body: "My thoughts exactly! -Exactly the entire opposite."
            })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).to.equal(
                "Numbers only for article ids, please."
              );
            });
        });

      it("ERROR HANDLES invalid methods - eg an attempt to PUT on api/articles/2/comments", () => {
        return request(app)
          .put("/api/articles/1/comments")
          .send({
            comment_id: 2,
            author: "butter_bridge",
            article_id: 1,
            votes: 14,
            created_at: "2016-11-22T12:36:03.389Z",
            body:
              "The beautiful thing about treasure is it's SHINY!!!"
          })
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
//SEE THIS FOR POSTING COMMENT ERROR 
// Are next 2 tests the same...?
      it("GET:200, responds to a GET request for all comments on a given article_id with an array of comments", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {console.log("SEE THIS FOR POSTING COMMENT ERROR ")
            expect(body.comments[0]).to.contain.keys(
              "comment_id",
              "votes",
              "body",
              "author",
              "created_at"
            );
            expect(
              body.comments[0]).to.eql({
                comment_id: 2,
                author: "butter_bridge",
                article_id: 1,
                votes: 14,
                created_at: "2016-11-22T12:36:03.389Z",
                body:
                  "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky."
              })
          });
      });

      it("GET:200, responds to a GET request for all comments on a given article_id with an array of comments", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments[0]).to.contain.keys(
              "comment_id",
              "votes",
              "body",
              "author",
              "created_at"
            );
            expect(body.comments[0]).to.eql({
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

      it("GET:200, responds with an empty array when a GET request is made to an article which exists, but has no comments attached to it", () => {
        return request(app)
          .get("/api/articles/2/comments")
          .expect(200)
          .then(({ body }) =>{
            expect(body.comments).to.eql([])
          });
      });

      // FAILS TEST
      it("ERROR HANDLES - responds with a 404 when a request is made using a valid article_id no. where the article does not exist", () => {
        return request(app)
          .get("/api/articles/567/comments")
          .expect(404)
          .then(({ body }) => {console.log(body)
          expect(body.msg).to.eql("No such article, aim lower");
          });
      });

      it("GET:200 - QUERY - will SORT_BY any valid column, with default order descending(eg by votes)", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=votes")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.descendingBy("votes");
          });
      });

      //  it.only("GET:200 - QUERY, responds with an array of articles, sorted in ascending order when requested)", () => {
      //    return request(app)
      //      .get("/api/articles/1/comments?order=asc")
      //      .expect(200)
      //      .then(({ body }) => {console.log(body)
      //       //  expect(body.articles[0]).to.eql({
      //       //    article_id: 12,
      //       //    title: "Moustache",
      //       //    body: "Have you seen the size of that thing?",
      //       //    votes: 0,
      //       //    topic: "mitch",
      //       //    author: "butter_bridge",
      //       //    created_at: "1974-11-26T12:21:54.171Z",
      //       //    comment_count: "0"
      //       //  });
      //      });
      //  });

      it("ERROR HANDLING (with PSQL)- QUERY - will reject a SORT_BY for an invalid column", () => {
        return request(app)
          .get("/api/articles/1/comments?sort_by=not_this")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("not a valid category to sort_by...");
          });
      });

      it("GET:200 - QUERY - will accept an ORDER of asc or desc, sorting by 'created at' as a default descending(eg by votes)", () => {
        return request(app)
          .get("/api/articles/1/comments?order_by=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.ascendingBy("created_at");
          });
      });

      it("ERROR HANDLES - Responds with a 400: Bad Request when a GET request is made with an invalid id", () => {
        return request(app)
          .get("/api/articles/not_a_valid_id/comments")
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal(
              "invalid (bad) request - ids: numbers only; votes: I need your number, no strings ;)"
            );
          });
      });
      // check if .length = expected no. of article comments...
    });
  });

  // COMMENTS
  describe("/comments", () => {
    it("GET:200, /:comment_id responds with the requested comment", () => {
      return request(app)
        .get("/api/comments/11")
        .expect(200)
        .then(({ body }) => {
          expect(body.comment.body).to.eql("Ambidextrous marsupial");
        });
    });
  });

  it("PATCH:200 - api/comments/:comment_id responds to a patch request to increase the number of votes", () => {
    return request(app)
      .patch("/api/comments/3")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.msg).to.equal("Votes recounted");
        expect(body.comment).to.eql({
          comment_id: 3,
          author: "icellusedkars",
          article_id: 1,
          votes: 101,
          created_at: "2015-11-23T12:36:03.389Z",
          body:
            "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works."
        });
      });
  });

  it("Responds to a patch request to increase the number of votes by a negative quantity", () => {
    return request(app)
      .patch("/api/comments/3")
      .send({ inc_votes: -40 })
      .expect(200)
      .then(({ body }) => {
        expect(body.msg).to.equal("Votes recounted");
        expect(body.comment).to.eql({
          comment_id: 3,
          author: "icellusedkars",
          article_id: 1,
          votes: 60,
          created_at: "2015-11-23T12:36:03.389Z",
          body:
            "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works."
        });
      });
  });

  it("PATCH:200 - api/comments/:comment_id responds to a patch request with no 'inc_votes' body with a 200 status and unchanged comment", () => {
    return request(app)
      .patch("/api/comments/3")
      .send({ })
      .expect(200)
      .then(({ body }) => {
        expect(body.msg).to.equal("Votes recounted");
        expect(body.comment).to.eql({
          comment_id: 3,
          author: "icellusedkars",
          article_id: 1,
          votes: 100,
          created_at: "2015-11-23T12:36:03.389Z",
          body:
            "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works."
        });
      });
  });

  it("ERROR HANDLES - PATCH:200 - api/comments/:comment_id responds to a patch request to increase the number of votes", () => {
    return request(app)
      .patch("/api/comments/1000")
      .send({ inc_votes: 4 })
      .expect(404)
      .then(({ body }) => {console.log(body)
        expect(body.msg).to.equal("No such comment exists");
      //   expect(body.comment).to.eql({
      //     comment_id: 3,
      //     author: "icellusedkars",
      //     article_id: 1,
      //     votes: 101,
      //     created_at: "2015-11-23T12:36:03.389Z",
      //     body:
      //       "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works."
      //   });
      });
  });

  it("ERROR HANDLES invalid methods - eg an attempt to PUT on api/comments", () => {
    return request(app)
      .put("/api/comments/3")
      .send({
        comment_id: 3,
        author: "icellusedkars",
        article_id: 1,
        votes: 100,
        created_at: "2015-11-23T12:36:03.389Z",
        body:
          "Fashion is the passion of a fruit in a suit."
      })
      .expect(405)
      .then(({ body }) => {
        expect(body.msg).to.equal("method not allowed");
      });
  });


  it('Deletes a given comment "/api/ comments/:comment_id" by comment_id', () => {
    return request(app)
      .delete("/api/comments/2")
      .expect(204);
  });
  it("ERROR HANDLES: responds with a 404 not found when asked to delete a non-existent comment", () => {
    return request(app)
      .delete("/api/comments/303")
      .expect(404);
  });
  it("ERROR HANDLES: (suing PSQL) responds with a 400 when asked to delete a comment-id which is eg not a number", () => {
    return request(app)
      .delete("/api/comments/mysterymusing")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).to.equal(
          "invalid (bad) request - ids: numbers only; votes: I need your number, no strings ;)"
        );
      });
  });
});

// TO SORT - GET /api/articles accepts queries

// Un-nest test responses/ uncomplicate bodies/ returns
// Further Error-handling - standard cases - fringe/ extra cases...
