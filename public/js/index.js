(() => {
    "use strict"; 
    
    const resultTemplate = `
    <table class='highlight'>
        <thead>
          <tr>
              <th data-field="id">Nombre de Usuario</th>
              <th data-field="name">Origen</th>
              <th data-field="price">Destino</th>
              <th data-field="price">Precio</th>
          </tr>
        </thead>
        <tbody>
        <% _.each(ofertas, (oferta) => { %>
          <tr>
            <td><%= oferta.Nombre %></td>
            <td><%= oferta.Origen %></td>
            <td><%= oferta.Destino %></td>
            <td><%= oferta.Precio %></td>
          </tr>
        <% }); %>
        </tbody>
    </table>
    `;
    
    // const mostrando_destino = (datos) =>{
    //     console.log("Datos recibidos:"+datos); 
              
    //     $("#oferta_coches").css("display","block");
        
    //     // $("#finaltable").html(destino);
    //     $("#finaltable").html(_.template(resultTemplate, {ofertas: datos.contenido}));
    // }

    $(document).ready(() => {
        console.log("Documento cargado");
        var idUsuario;
        $("#oferta_coches").css("display","none");
        $("#ofertas_taxis").css("display","none");
        $("#busqueda").css("display", "none");
        $("#form_conductor").css("display", "none");
        
        $("#form_registro").css("display", "none");
        $("#form_login").css("display", "none");  
        
        $("#pasajero").click((event)=>{
            event.preventDefault();
            $("#busqueda").css("display", "block");
            $("#form_conductor").css("display", "none");
        });
        
        $("#conductor").click((event)=>{
            event.preventDefault();
            $("#form_conductor").css("display", "block");
            $("#oferta_coches").css("display","none");
            $("#busqueda").css("display", "none");
        });
        
        //--------------------------------------------------------------------------------------------
        //Botón para la BÚSQUEDA de destino.
        $("#buscar_destino").click((event)=>{
            event.preventDefault();
            
            var destino = document.getElementById("destino_elegido").value;
            console.log("Destino: "+destino); 
            
            // $.get('/destino', {destino_elegido: destino}, mostrando_destino, 'json');
            
            $.get('/destino', {destino_elegido:destino}, (datos)=>{
              console.log("Datos recibidos:"+datos); 
              
              $("#finaltable").html(_.template(resultTemplate, {ofertas: datos.contenido }));
              $("#oferta_coches").css("display","block");
            });
            
            
        }); 
        
        //--------------------------------------------------------------------------------------------
        // REGISTRARSE. Insertar un usuario en la BD.
         
        $("#ini_sesion").click((event)=>{   //Mostrar el formulario para iniciar sesión
            event.preventDefault();
            $("#form_registro").css("display", "none");
            $("#form_login").css("display", "block");
        });
        
        $("#reg").click((event)=>{          //Mostrar el formulario para registrarse
            event.preventDefault();
            $("#form_registro").css("display", "block");
            $("#form_login").css("display", "none");
        });

        $("#iniciar_sesion").click((event)=>{   //Recibir datos del formulario
            event.preventDefault();
            var nombre_usuario = document.getElementById("nombre_login").value;
            var password_usuario = document.getElementById("password_login").value;
            console.log("Nombre: "+nombre_usuario+" password: "+password_usuario);
            
            $.get('/sesion_usuario',{nombre: nombre_usuario, password: password_usuario}, (datos)=>{
                // $("#usu_correcto").html("Usuario correcto");
                idUsuario = datos.contenido;
                console.log("IDusuario recibido del servidor: "+idUsuario);
            });
        });
         
        $("#registro").click((event)=>{
            event.preventDefault();

            var nombre  = document.getElementById("nombre").value;
            var apellidos  = document.getElementById("apellidos").value;
            var zonas  = document.getElementById("zonas").value;
            var vehiculo  = document.getElementById("vehiculo").value;
            var telefono = document.getElementById("telefono").value;
            var password = document.getElementById("password").value;
            var email = document.getElementById("email").value;
            var codigoPostal = document.getElementById("codigo_postal").value;
            
            console.log(" Nombre: "+nombre + " apellidos: "+apellidos + " zonas: "+zonas +" vehiculo: "+vehiculo +" password: "+password +" email: "+email + " telefono: "+ telefono + " codigoPostal: "+ codigoPostal); 
            
            $.get('/registro_usuario',{nombre: nombre, apellidos:apellidos, zonas:zonas, vehiculo: vehiculo, password: password, email:email, telefono:telefono, codigoPostal: codigoPostal}, (datos)=>{
            });
        });
        
        //--------------------------------------------------------------------------------------------
        // PUBLICAR una oferta.
        
        $("#publicar").click((event)=>{
            event.preventDefault();
            
            var nombre = document.getElementById("first_name").value;
            console.log("Nombre: "+nombre);
            var vehiculo = document.getElementById("vehiculo").value;
            console.log("Vehiculo: "+vehiculo);
            var p_origen = document.getElementById("publicar_origen").value;
            console.log("origen: "+p_origen);
            var p_destino = document.getElementById("publicar_destino").value;
            console.log("destino: "+p_destino);
            var precio = document.getElementById("publicar_precio").value;
            console.log("preci: "+precio);
            console.log("idofertante: "+idUsuario);
            $.get('/publicar_oferta',{Ofertante: idUsuario, Nombre: nombre, Vehiculo: vehiculo, Origen: p_origen, Destino: p_destino, Precio: precio}, (datos)=>{
                
            });
        });

    });
})();