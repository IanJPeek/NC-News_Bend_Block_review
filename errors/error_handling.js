const express = require("express");
const app = express();

// require

exports.handlePSQLErrors = (err, req, res, next) => {
  // console.log("PSQL", err);
  if (err.code === "22P02"){ console.log("checked");
    res.status(400).send({msg:"invalid (bad) request - request must contain a number"})
  }
  if (err.code === "22003") {
    res
      .status(404)
      .send({ msg: "No such article found - MUCH lower number please!" });
  } 
  if (err.code === "23502"){
    res.status(400).send({msg:"Please include username AND body in POST request"})}
    if (err.code === "42703"){
      res.status(400).send({ msg: "not a valid category to sort_by..." });
    }
    else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  // console.log("custom", err);
  res.status(err.status).send({ msg: err.msg });
}

exports.handleLeftoverErrors = (err, req, res, next) =>
  res.status(404).send("route not found");


// module.exports = {handlePSQLErrors, handleCustomErrors, handleLeftoverErrors};