const express = require("express");
const router = express.Router();
const fs= require("fs");

router.get("/", function(req, res){
  fs.readFile('./pets.json', 'utf8', function(err, data){
    response = JSON.parse(data);
    res.send(response);
  });
});

router.get("/:id", function(req, res){
  fs.readFile('./pets.json', 'utf8', function(err, data){
    response = JSON.parse(data);
    let id = Number.parseInt(req.params.id);
    if(id > -1 && id < response.length) {
      res.send(response[id]);
    } else {
      // res.status = 404;
      // res.send("index out of bounds");
      res.sendStatus(404);
    }
  });
});

module.exports = router;
