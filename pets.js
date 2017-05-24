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
    process.exit(1);
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
        process.exit(1);
      }
    }
  });
}

function createPets(){
  if(!process.argv[3] || !process.argv[4] || !process.argv[5]){
    console.error('Usage: node pets.js create AGE KIND NAME');
    process.exit(1);
  } else {
    fs.readFile('./pets.json', 'utf8', function(err, res){
      response = JSON.parse(res);
      let petObj = {};
      petObj.age = Number(process.argv[3]);
      petObj.kind = process.argv[4];
      petObj.name = process.argv[5];
      response.push(petObj);

      fs.writeFile('pets.json', JSON.stringify(response), (err) => {
        if (err) throw err;
        console.log(petObj);
      });
    });
  }
}
