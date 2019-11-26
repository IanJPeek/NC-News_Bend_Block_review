const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const {handlePSQLErrors, handleCustomErrors, handleLeftoverErrors} = require("./errors/error_handling");

app.use(express.json());
app.use("/api", apiRouter);

// PSQL error handler - eg string instead of number/ number instead of string

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleLeftoverErrors);

// app.use((err, req, res, next) => {
//   // console.log("PSQL", err);
//   if (err.code === "22P02"){
//     res.status(400).send({msg:"invalid (bad) request - ids: numbers only; votes: I need your number, no strings ;)"})
//   }
//   if (err.code === "22003") {
//     res
//       .status(404)
//       .send({ msg: "No such article found - MUCH lower number please!" });
//   } 
//   if (err.code === "23502"){
//     res.status(400).send({msg:"Please include username AND body in POST request"})}
//   else next(err);
// });

// //custom error handler
// app.use((err, req, res, next) => {
//   // console.log("custom", err);
//   res.status(err.status).send({ msg: err.msg });
// });

app.all("/*", (req, res, next) => res.status(404).send("route not found"));

module.exports = app;
