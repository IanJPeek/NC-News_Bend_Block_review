const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const {handlePSQLErrors, handleCustomErrors, handleLeftoverErrors} = require("./errors/error_handling");

app.use(express.json());
app.use("/api", apiRouter);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleLeftoverErrors);

app.all("/*", (req, res, next) => res.status(404).send("route not found"));

module.exports = app;
