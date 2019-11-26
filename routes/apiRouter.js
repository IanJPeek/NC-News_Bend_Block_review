const apiRouter = require("express").Router();
const topicRouter = require("./topicRouter");
const userRouter = require("./userRouter");
const articleRouter = require("./articleRouter");
const commentRouter = require("./commentRouter.js");


apiRouter.use("/topics", topicRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/comments", commentRouter);


apiRouter.all("/*", (req, res, next) => res.status(405).send({msg: "method not allowed"})
);

module.exports = apiRouter;