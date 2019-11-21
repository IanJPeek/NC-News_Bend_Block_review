const badRouter = require("express").Router();

// console.log("bad path")
const { badRoute } = require("../controllers/controllers");

badRouter.route("/").get(badRoute);

module.exports = badRouter;


// badRouter.route("/").send({ msg: "404 Not Found - That aint a thing" })

// module.exports = badRouter;