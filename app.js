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

// connection.query("SELECT * FROM USUARIOS",(err,rows)=>{
//     if(err) throw err;
//     console.log("Lista de usuarios:");
//     for (var i=0;i<rows.length;i++){
//         console.log(rows[i].idUSUARIOS + " " + rows[i].Nombre + " " + rows[i].Apellidos + " " + rows[i].Zonas + " " + rows[i].Vehiculo);
//     }
// });

//-------------------------------------------------------------------------------------

app.get('/', (request, response) => {     
    console.log("Accediendo a index");

    // connection.query("SELECT * FROM TRAYECTO",(err,rows)=>{
    //     if(err) throw err;
    //     console.log("Lista de trayectos:");
    //     for (var i=0;i<rows.length;i++){
    //         console.log(rows[i].idTRAYECTO + " " + rows[i].Ofertante + " " + rows[i].Origen + " " + rows[i].Destino + " " + rows[i].Dias + " " + rows[i].TRAYECTOcol);
    //     }
    //     response.send({contenido: rows[1].Origen});
    // });

});

//---------------------------------------------------------------------------------
// Búsqueda de un destino en la base de datos.

app.get('/destino',(request, response)=>{     
    console.log("Accediendo a busqueda de un destino");
    var resultado = request.query.destino_elegido;
    console.log("datos : "+resultado);

    connection.query('SELECT * FROM TRAYECTO WHERE Destino= ? ',[resultado] ,(err,rows)=>{
        if(err) throw err;
        // console.log("consulta: "+rows[0].Origen);
        response.send({mensaje: "Consulta realizada", contenido: rows});
    });
    // response.send("devolviendo desde el servidor...");
    
});

//---------------------------------------------------------------------------------
// Almacenar en la base de datos

app.get('/registro_usuario',(request, response)=>{
    console.log("Accediendo a registro");
    
    // Elección del Id de usuario ?
    
    var usuario = {Nombre: request.query.nombre, Apellidos: request.query.apellidos, Zonas: request.query.zonas, Vehiculo: request.query.vehiculo, Telefono: request.query.telefono, Password: request.query.password, Email: request.query.email, CodigoPostal: request.query.codigoPostal};
    connection.query('INSERT INTO USUARIOS SET ?', usuario ,(err,rows)=>{
    // connection.query('INSERT INTO USUARIOS (Nombre, Apellidos, Zonas,Vehiculo,Telefono,Password,Email,CodigoPostal) VALUES (nombre,apellidos,zonas,vehiculo,telefono,password,email,codigoPostal)' ,(err,rows)=>{
        if(err) throw err;
        
    });
});

app.get('/sesion_usuario', (request, response)=>{
    var nombre_usuario = request.query.nombre;
    var password_usuario = request.query.password;
    console.log("Nombre: "+nombre_usuario+" password: "+password_usuario);
    
    connection.query('SELECT * FROM USUARIOS WHERE Nombre=? AND Password=?',[nombre_usuario, password_usuario], (err,rows)=>{
        if(err) throw err;
        var id_usuario = rows[0].idUSUARIOS;
        console.log("rows idUSUARIOS: "+id_usuario);
        response.send({mensaje: "Consulta realizada", contenido: id_usuario});
    });
});

//---------------------------------------------------------------------------------
// Almacenar oferta en la tabla TRAYECTOS.

app.get('/publicar_oferta',(request, response)=>{
    var oferta = {Nombre: request.query.Nombre, Vehiculo: request.query.Vehiculo, Origen: request.query.Origen, Destino: request.query.Destino, Precio: request.query.Precio}; 
    console.log("origen: "+request.query.Origen);
    console.log("destino: "+request.query.Destino);
    connection.query('INSERT INTO TRAYECTO SET ?', oferta,(err,rows)=>{
      if(err) throw err;
    });
});


//---------------------------------------------------------------------------------

app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost: ${app.get('port')}` );
});
