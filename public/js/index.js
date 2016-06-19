(() => {

    $(document).ready(() => {
    
        console.log("Documento cargado");

    $("#oferta_coches").css("display","none");
    $("#ofertas_taxis").css("display","none");

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
    $("#pene").click((event)=>{
        event.preventDefault();
        $.get('/traemeeso',(datos)=>{
            console.log(datos[0].Origen);
        });
    });
    
    //Vuelco en html el contenido de la variable ouput en el div ofertas
    $("#ofertas").fadeIn();
    //$("#ofertas").html(output);
    
    });
})();