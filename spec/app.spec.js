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
        console.log(body)
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
  });

describe("/comments", () => {
  it("GET:200, responds with an array of comments", () => {
    return request(app)
      .get("/api/comments")
      .expect(200)
      .then(({ body }) => {console.log(body)})
      //   expect(body.comments[0]).to.contain.keys(
      //     "comment_id",
      //     "author",
      //     "article_id",
      //     "votes",
      //     "body",
      //     "created_at"
      //   );
      // });
  });
});

});

