"use strict";

var express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

app.set('port', (process.env.PORT || 5000));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// app.use(expressLayouts);

app.use(express.static(__dirname + '/public'));


// Conexión con la Base de Datos --------------------------------------------------------------

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'alu0100406122',
  password: '',
  database: 'mydb',
  port: 3306
});
console.log("connecting...");

//connection.query("use mydb");

connection.connect(function(error){
  if(error){
      throw error;
  }else{
      console.log('Conexion correcta.');
  }
});

connection.query("SELECT * FROM USUARIOS",(err,rows)=>{
    if(err) throw err;
    console.log("Lista de usuarios:");
    for (var i=0;i<rows.length;i++){
        console.log(rows[i].idUSUARIOS + " " + rows[i].Nombre + " " + rows[i].Apellidos + " " + rows[i].Zonas + " " + rows[i].Vehiculo);
    }
});

//-------------------------------------------------------------------------------------



app.get('/', (request, response) => {     
    console.log("Accediendo a index");

    connection.query("SELECT * FROM TRAYECTO",(err,rows)=>{
        if(err) throw err;
        console.log("Lista de trayectos:");
        for (var i=0;i<rows.length;i++){
            console.log(rows[i].idTRAYECTO + " " + rows[i].Ofertante + " " + rows[i].Origen + " " + rows[i].Destino + " " + rows[i].Dias + " " + rows[i].TRAYECTOcol);
        }
        response.send({contenido: rows[1].Origen});
    });

    
});

app.get('/traemeeso',(request,response)=>{
    connection.query("SELECT * FROM TRAYECTO",(err,rows)=>{
        if(err) throw err;
        console.log("Lista de trayectos:");
        for (var i=0;i<rows.length;i++){
            console.log(rows[i].idTRAYECTO + " " + rows[i].Ofertante + " " + rows[i].Origen + " " + rows[i].Destino + " " + rows[i].Dias + " " + rows[i].TRAYECTOcol);
        }
        response.send(rows);
    });
});


app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
