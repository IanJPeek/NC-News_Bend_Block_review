const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use(express.json());
app.use("/api", apiRouter);

// const topicRouter = require("./routes/topicRouter")
// apiRouter.use("/topics", topicRouter)




// PSQL error handler - eg string instead of number
app.use((err, req, res, next) => {
  console.log("PSQL", err);
  if (err.code === "22P02"){
    res.status(400).send({msg:"invalid (bad) article request - numbers only"})
  }
  else next(err)
});

//custom error handler
app.use((err, req, res, next) => {
  console.log("custom", err);
  
  res.status(err.status).send({ msg: err.msg });
});

// 404 handler
// app.use('/*', (err,req, res, next) => {res.status(404).send({msg: "404 Not Found - That aint a thing"})
// })

app.all("/*", (req, res, next) => res.status(404).send("route not found"));

module.exports = app;
