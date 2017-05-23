const fs = require('fs');
switch(process.argv[2]){
  case 'read':
    readPets();
    break;
  case 'create':
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
