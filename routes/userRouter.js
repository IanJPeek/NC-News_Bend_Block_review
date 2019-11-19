const userRouter = require("express").Router();

const { getUsers } = require("../controllers/controllers");

userRouter.route("/").get(getUsers);

console.log("users found");

module.exports = userRouter;
