const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const router = require("./restfulRoutes");

app.use("/pets", router);

// app.get('/', function(req, res, next) {
//   Item.find(function(err, items) {
//     if (err) return next(err);
//     console.log(items);
//   });
// });

// app.use(function(err, req, res, next) {
//   console.error(err.stack);
//   return res.send(500, { message: err.message });
// });

app.use(function (req, res) {
  res.sendStatus(404);
  // res.status(404).send("Not Found");
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
