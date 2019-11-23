const userRouter = require("express").Router();

const { getUsers, getSingleUser } = require("../controllers/controllers");

userRouter.route("/").get(getUsers);
userRouter.route("/:username").get(getSingleUser);


console.log("users found");

userRouter.all("/*", (req, res, next) =>
  res.status(405).send({msg: "method not allowed"}));

module.exports = userRouter;
