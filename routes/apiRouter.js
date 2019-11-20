const apiRouter = require("express").Router();
const topicRouter = require("./topicRouter");
const userRouter = require("./userRouter");
const articleRouter = require("./articleRouter");
const commentRouter = require("./commentRouter.js");
// const badRouter = require("./badRouter");

apiRouter.use("/topics", topicRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);
// apiRouter.use("/*", badRouter);

module.exports = apiRouter;