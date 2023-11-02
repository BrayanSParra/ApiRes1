let express = require('express');
let mysql = require('mysql');
let app = express();
app.use(express.json());

app.listen('3000', function(){
  console.log('Servidor OK','3000');
})

app.get('/', function(req,res){
  res.send('ruta Inicio');
})
