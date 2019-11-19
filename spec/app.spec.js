process.env.NODE_ENV= "test";

const request = require ("supertest");
const {expect} = require ("chai");
const app = require ("../app");
const connection = require("../db/connection")

describe('/api', () => {
beforeEach(() => connection.seed.run());
after(() => connection.destroy());

  describe('/topics', () => {
    it('GET:200, responds with an array of topics', () => {
      return request(app).get("/api/topics")
      .expect(200)
      .then(({body}) => {
        expect(body.topics[0]).to.contain.keys("description", "slug")
      })
    });
  })


  describe("/users", () => {
    it("GET:200, responds with an array of users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users[0]).to.contain.keys("username","name","avatar_url")
        });
    });
    describe('/users', () => {
      it("GET:200, /:username responds with the requested user", () => {
        return request(app)
         .get("/api/users/lurker")
        .expect(200)
        .then(({body}) => {
          console.log(body.user)
          expect(body.user[0].username).to.eql("lurker")
      });
      
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
      
      describe('/articles', () => {
      it("GET:200, /:article_id responds with the requested article", () => {
        return request(app)
         .get("/api/articles/4")
        .expect(200)
        .then(({body}) => {
          expect(body.article[0].topic).to.eql("mitch")
      });
    })
    // it('GET:200, / articles/:article_id/comments', () => {
      
    // }); 
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

describe.only('/comments', () => {
      it("GET:200, /:comment_id responds with the requested comment", () => {
        return request(app)
         .get("/api/comments/11")
        .expect(200)
        .then(({body}) => { console.log(body);
          expect(body.comment[0].title).to.eql("Am I a cat?")
      })
      });
    })

});

});

