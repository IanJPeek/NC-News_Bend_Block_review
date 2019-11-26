const userRouter = require("express").Router();

const { getUsers, getSingleUser,send405 } = require("../controllers/controllers");

userRouter
  .route("/")
  .get(getUsers)
  .all(send405);
userRouter
  .route("/:username")
  .get(getSingleUser)
  .all(send405);

console.log("users found");

module.exports = userRouter;
