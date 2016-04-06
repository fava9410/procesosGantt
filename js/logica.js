$(document).ready(function(){
  var tiemposRafaga = ["Tiempo Rafaga"];
  var procesos = ["Proceso","A","B","C","D","E","F","G"];
  var llegada = ["Tiempo de llegada"];
  var tiempoFinalizacion = ["Tiempo de Finalizacion"];
  var tiempoRetorno = ["Tiempo de Retorno"];
  var tiempoEspera = ["Tiempo de Espera"];
  var tiempoComienzo = ["Tiempo de Comienzo"];
  var colores = ["red","blue","green","brown","yellow","purple","magenta","gray","white"]
  var alea = 0;
  var matriz = [procesos,llegada,tiemposRafaga,tiempoComienzo,tiempoFinalizacion,tiempoRetorno,tiempoEspera];
  var intervalo = 10, tamaño = 20, contador = 1;
  $("#inicio").click(function(){

    

    rellenarTabla();
    dibujarTabla();
    //contador++;
      /*if(contador>tiempoFinalizacion[tiempoFinalizacion.length-1]){
        clearInterval(intervalo);
      }*/
    
    $("#inicio").hide();
    pintar();
    setInterval(pintar_procesos,1000);                
  });  
  //$("#lienzo").css({"background-color":"black"});

  function rellenarTabla(){
    //RAFAGA
    for(var i=0; i<procesos.length-1; i++){
      alea = Math.round(Math.random()*6+1);
      tiemposRafaga.push(alea);
    }
    //LLEGADA
    for(var i=0; i< (procesos.length-1)*4; i+=4){
      alea = i+Math.round(Math.random()*3);
      llegada.push(alea);
    }
    //FINALIZACION
    for(var i=1; i<procesos.length; i++){
      if(llegada[i]>=tiempoFinalizacion[i-1] || i==1){
        tiempoFinalizacion.push(llegada[i]+tiemposRafaga[i]);
      } else{
        tiempoFinalizacion.push(tiempoFinalizacion[i-1]+tiemposRafaga[i]);  
      }
    }    
    //RETORNO
    for(var i=1; i<procesos.length; i++){
      tiempoRetorno.push(tiempoFinalizacion[i]-llegada[i]);
    }
    //ESPERA
    for(var i=1; i<procesos.length; i++){
      tiempoEspera.push(tiempoRetorno[i]-tiemposRafaga[i]);
    }
    //COMIENZO
    for(var i=1; i<procesos.length; i++){
      tiempoComienzo.push(llegada[i]+tiempoEspera[i]);
    }
  }

  function dibujarTabla(){
    // Obtener la referencia del elemento body
    var body = document.getElementById("tabla");

    // Crea un elemento <table> y un elemento <tbody>
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");
   
    // Crea las celdas
    for (var j = 0; j < procesos.length; j++) {
      // Crea las hileras de la tabla
      var hilera = document.createElement("tr");
   
      for (var i = 0; i < matriz.length; i++){
        // Crea un elemento <td> y un nodo de texto, haz que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final
        // de la hilera de la tabla
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode(matriz[i][j]);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }
   
      // agrega la hilera al final de la tabla (al final del elemento tblbody)
      tblBody.appendChild(hilera);
    }
   
    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
  }

  function pintar(){
    var elemento = document.getElementById("lienzo");
    var lienzo = elemento.getContext('2d');          
    // DIBUJAR PROCESOS
    for(var i=1; i<procesos.length; i++){
      lienzo.fillStyle=colores[i];
      lienzo.fillRect(10,i*(tamaño+intervalo),tamaño,tamaño);
      lienzo.fillStyle = "white";
      lienzo.font = "20px Arial";
      lienzo.fillText(procesos[i],13,i*(tamaño+intervalo)+17);
    }
    //DIBUJAR NUMEROS
    for(var i=0; i<=tiempoFinalizacion[tiempoFinalizacion.length-1]; i++){
      lienzo.fillStyle = "black";
      lienzo.font = "20px Arial";
      lienzo.fillText(i, (i+1)*(tamaño+intervalo)+10, 290);
    }
  }
  function pintar_procesos(){
    var elemento = document.getElementById("lienzo");
    var lienzo = elemento.getContext('2d');      
    for(var i=1; i<procesos.length; i++){ 
      if(contador-1 >= tiempoComienzo[i] && contador-1<tiempoFinalizacion[i]){
        lienzo.fillStyle = colores[i];      
      }
      else{
        if(llegada[i]>contador-1 || contador-1>=tiempoFinalizacion[i]){
          lienzo.fillStyle = colores[colores.length-1];
        }
        else{
          lienzo.fillStyle = colores[0];
        }
      }
      lienzo.fillRect(contador*(tamaño+intervalo)+10, i*(tamaño+intervalo),tamaño,tamaño);       
    }
    contador++;
  }
});