const apiRouter = require("express").Router();
const topicRouter = require("./topicRouter");
const userRouter = require("./userRouter");
const articleRouter = require("./articleRouter");
const commentRouter = require("./commentRouter.js");
const {getEndpoints} = require("../controllers/controllers")

apiRouter.route("/")
.get(getEndpoints)

apiRouter.use("/topics", topicRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);

const { send404, send405 } = require("../controllers/controllers");

apiRouter.route("/*").get(send404).all(send405)

module.exports = apiRouter;