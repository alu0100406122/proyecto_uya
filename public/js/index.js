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

        $("#oferta_coches").css("display","none");
        $("#ofertas_taxis").css("display","none");
        $("#busqueda").css("display", "none");
        $("#form_conductor").css("display", "none");
        
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
         //Botón para insertar un usuario en la BD.
        $("#registro").click((event)=>{
            event.preventDefault();
         
                var nombre  = document.getElementById("nombre").value;
                var apellidos  = document.getElementById("apellidos").value;
                var zonas  = document.getElementById("zonas").value;
                var vehiculo  = document.getElementById("vehiculo").value;
                var telefono = document.getElementById("password").value;
                var password = document.getElementById("email").value;
                var email = document.getElementById("telefono").value;
                var codigoPostal = document.getElementById("codigo_postal").value;
                
                console.log(" Nombre: "+nombre + " apellidos: "+apellidos + " zonas: "+zonas +" vehiculo: "+vehiculo +" password: "+password +" email: "+email + " telefono: "+ telefono + " codigoPostal: "+ codigoPostal); 
           
            });


    });
})();