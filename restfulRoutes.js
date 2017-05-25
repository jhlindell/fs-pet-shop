const express = require("express");
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

router.get("/", function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    response = JSON.parse(data);
    res.send(response);
  });
});

router.get("/:id", jsonParser, function(req, res) {
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    response = JSON.parse(data);
    let id = Number.parseInt(req.params.id);
    if (id > -1 && id < response.length) {
      res.send(response[id]);
    } else {
      // res.status = 404;
      // res.send("index out of bounds");
      res.sendStatus(404);
    }
  });
});

router.post('/', jsonParser, function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  } else {
    if (!req.body.age || !req.body.name || !req.body.kind || Number(req.body.age) === "NaN") {
      res.sendStatus(400);
    } else {
      fs.readFile('./pets.json', 'utf8', function(err, data) {
        let response = JSON.parse(data);
        let petObj = {};
        petObj.age = Number(req.body.age);
        petObj.kind = req.body.kind;
        petObj.name = req.body.name;
        response.push(petObj);

        fs.writeFile('pets.json', JSON.stringify(response), (err) => {
          if (err) {
            throw err;
          } else {
            res.status(200);
            res.send(petObj);
          }
        });
      });

    }
  }
});

router.patch("/:id", jsonParser, function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  } else {

    fs.readFile('./pets.json', 'utf8', function(err, data) {
      let response = JSON.parse(data);
      if (req.params.id > -1 && req.params.id < response.length) {
        if ((req.body.age && Number(req.body.age) !== "NaN")|| req.body.name || req.body.kind) {
          var petObj = {};
          petObj.age = response[req.params.id].age;
          petObj.kind = response[req.params.id].kind;
          petObj.name = response[req.params.id].name;
          if(req.body.age){
            petObj.age = req.body.age;
          }
          if(req.body.kind){
            petObj.kind = req.body.kind;
          }
          if(req.body.name){
            petObj.name = req.body.name;
          }
          response[req.params.id] = petObj;
        }
        fs.writeFile('pets.json', JSON.stringify(response), (err) => {
          if (err) {
            throw err;
          } else {
            res.status(200);
            res.send(petObj);
          }
        });
      }
    });
  }
});

router.delete("/:id", jsonParser, function(req,res){
  fs.readFile('./pets.json', 'utf8', function(err, data) {
    response = JSON.parse(data);
    let id = Number.parseInt(req.params.id);
    if (id > -1 && id < response.length) {
      let petObj = response[id];
      response.splice(id, 1);
      fs.writeFile('pets.json', JSON.stringify(response), (err) => {
        if (err) {
          throw err;
        } else {
          res.status(200);
          res.send(petObj);
        }
      });
    } else {
      res.sendStatus(404);
    }
  });
});

module.exports = router;
