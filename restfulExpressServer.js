const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const router = require("./restfulRoutes");

app.use("/pets", router);

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;
