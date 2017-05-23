let argLength = process.argv.length;
if(argLength<3){
console.error("Usage: node pets.js [read | create | update | destroy]");
} else {
  console.log("success!");
}
