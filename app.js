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

//crear 
//objeto de la conexion--  se establecen los parámetros
let conexion = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'articulos'
});

// Probar la conexión
conexion.connect(function(error){
  if(error){
      throw error;
  } else{
      console.log('Conexión exitosa');
  }    
});

app.get('/ApiRes/productos', (req,res)=>{
  conexion.query('SELECT * FROM productos', (error,filas)=>{
      if(error){
          throw error;
      }else{
          res.send(filas);
      }
  });
});

app.get('/ApiRes/productos/:id', (req,res)=>{
  conexion.query('SELECT * FROM productos WHERE id=?', [req.params.id] , (error,fila)=>{
      if(error){
          throw error;
      }else{
          res.json(fila);
         res.send(fila);  // para traer un solo resgistro “ descripción”
      }
  });
});

app.post('/ApiRes/productos',(req,res)=>{
  let data = {descripcion:req.body.descripcion, precio:req.body.precio, stock:req.body.stock};
  let sql = 'INSERT INTO productos SET ?';
  conexion.query(sql, data, function(error,results){
      if(error){
          throw error;
      }else{
         res.send(results);     
      }
  });
});