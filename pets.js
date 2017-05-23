const fs = require('fs');
switch(process.argv[2]){
  case 'read':
    readPets();
    break;
  case 'create':
    createPets();
    break;
  case 'update':

    break;
  case 'destroy':

    break;
  default:
    console.error("Usage: node pets.js [read | create | update | destroy]");
}

function readPets(){
  fs.readFile('./pets.json', 'utf8', function(err, res){
    response = JSON.parse(res);
    if(!process.argv[3]){
      if (err){
        console.error(err);
      } else {
        console.log(response);
      }
    } else {
      let index = process.argv[3];
      if(index > -1 && index < response.length) {
        console.log(response[process.argv[3]]);
      } else {
        console.error("Usage: node pets.js read INDEX");
      }
    }
  });
}

function createPets(){
  if(!process.argv[3] || !process.argv[4] || !process.argv[5]){
    console.error("Usage: node pets.js create AGE KIND NAME");
  } else {
    fs.readFile('./pets.json', 'utf8', function(err, res){
      response = JSON.parse(res);
      let petObj = {};
      petObj.age = process.argv[3];
      petObj.kind = process.argv[4];
      petObj.name = process.argv[5];
      response.push(petObj);

      fs.writeFile('pets.json', JSON.stringify(response), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    });
  }
}
