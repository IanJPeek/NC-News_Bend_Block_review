const userRouter = require("express").Router();

const { getUsers, getSingleUser } = require("../controllers/controllers");

userRouter.route("/").get(getUsers);
userRouter.route("/:username").get(getSingleUser);


console.log("users found");

module.exports = userRouter;
