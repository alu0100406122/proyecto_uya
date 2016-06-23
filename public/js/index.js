(() => {
    "use strict"; 
    
    const resultTemplate = `
    <div class="collection">
        <% _.each(ofertas, (oferta) => { %>
            <a href="#!" class="collection-item"> <%= oferta.Nombre %> </a>
        <% }); %>
    </div>
    
    `;
    
    /*global _*/
    const mostrando_destino = (datos) =>{
        console.log("Datos recibidos:"+datos); 
              
      $("#oferta_coches").css("display","block");
      
    //   $("#finaltable").html(destino);
      $("#finaltable").html(_.template(resultTemplate, { rows: datos.contenido }));
      
    }

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
            $("#busqueda").css("display", "none");
        });
    
        //Si hago click en botón moto. Petición ajax al usuarios.json y me descargo todos los servicios disponibles para moto 
        // $("#coche").click(function(event){
        //     event.preventDefault();
        //     console.log("Ha hecho click en coche.");
    
    
        //     // $.get('/usuarios', function(data){
        //     //     console.log("exito");
        //     // });
    
        //   //Descarga de los datos con la petición ajax
        // //   $.ajax({
        // //       //
        // //   })
        // //   //Si la petición ajax se realiza correctamente entramos en el done
        // //   // data --> Vuelca los datos de la función
        // //   // textStatus --> Estado de la petición (Texto)
        // //   // jqXHR --> Estado de la petición (Código)
        // //   .done(function(data,textStatus,jqXHR)
        // //   {
               
        // //   })
        // //   //errorThrown --> Devuelve el fallo
        // //   .fail(function(jqXHR,textStatus,errorThrown){
               
        // //   });
        //   //Datos los guardas en una variables output de salida
        // });
        
        // $.get('/', function(data){
        //     console.log("DatosBD"+data.Usuarios);
            
        //     $("prueba").html(data.contenido);
        // },(datos)=>{
        //     console.log(datos.contenido);
        // });
        // $.get('/prueba'),(hola)=>{
            
        // }
        // $("#pene").click((event)=>{
        //     event.preventDefault();
        //     $.get('/traemeeso',(datos)=>{
        //         console.log(datos[0].Origen);
        //     });
        // });
        
        //Botón para la BÚSQUEDA de destino.
        $("#buscar_destino").click((event)=>{
            event.preventDefault();
            
            var destino = document.getElementById("destino_elegido").value;
            console.log("Destino: "+destino); 
            
            
            $.get('/destino', {destino_elegido: destino}, mostrando_destino, 'json');
            
            // $.get('/destino', {destino_elegido:destino}, (datos)=>{
            //   console.log("Datos recibidos:"+datos); 
              
            //   $("#oferta_coches").css("display","block");
              
            // //   $("#finaltable").html(destino);
            //   $("#finaltable").html(_.template(resultTemplate, { rows: datos.contenido }));
              
            // });
            
            
        }); 
        
        
        
        //Vuelco en html el contenido de la variable ouput en el div ofertas
        $("#ofertas").fadeIn();
        // //$("#ofertas").html(output);
    
    });
})();