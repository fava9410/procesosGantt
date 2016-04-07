$(document).ready(function(){
  var tiemposRafaga = ["Tiempo Rafaga"];
  var procesos = ["Proceso","A","B","C","D","E","F","G"];
  var llegada = ["Tiempo de llegada"];
  var tiempoFinalizacion = ["Tiempo de Finalizacion"];
  var tiempoRetorno = ["Tiempo de Retorno"];
  var tiempoEspera = ["Tiempo de Espera"];
  var tiempoComienzo = ["Tiempo de Comienzo"];
  var colores = ["red","blue","green","brown","yellow","purple","magenta","gray","white"]
  var alea = 0, intervalo = 10, tamaño = 20, contador = 1;
  var matriz = [procesos,llegada,tiemposRafaga,tiempoComienzo,tiempoFinalizacion,tiempoRetorno,tiempoEspera];

  $("#inicio").click(function(){   

    rellenarTabla();
    dibujarTabla();
    $("#inicio").hide();
    pintar();
    setInterval(pintar_procesos,1000);                
  });  
  //$("#lienzo").css({"background-color":"black"});

  $("#parar").click(function(){
    var queda = 0;
    for(var i=1; i<procesos.length; i++){
      if(contador>=tiempoComienzo[i] && contador<tiempoFinalizacion[i]){
        queda = tiempoFinalizacion[i]-contador+1;

        for(var j=1; j<procesos.length; j++){
          llegada[j] = llegada[j]-queda;
        }
      }
    }  
      //borrarTabla();
      rellenarTabla();      
      dibujarTabla();
  });

  function rellenarTabla(){
    //RAFAGA
    for(var i=0; i<procesos.length-1; i++){
      alea = Math.round(Math.random()*6+1);
      tiemposRafaga.push(alea);
    }
    //LLEGADA
    for(var i=0; i< (procesos.length-1)*4; i+=4){
      if(contador == 1){
        alea = i+Math.round(Math.random()*3);
        llegada.push(alea);  
      }      
    }
    //FINALIZACION
    for(var i=1; i<procesos.length; i++){
      if(llegada[i]>=tiempoFinalizacion[i-1] || i==1){
        tiempoFinalizacion[i] = llegada[i]+tiemposRafaga[i];
      } else{
        tiempoFinalizacion[i] = tiempoFinalizacion[i-1]+tiemposRafaga[i];  
      }
    }    
    //RETORNO
    for(var i=1; i<procesos.length; i++){
      tiempoRetorno[i] = tiempoFinalizacion[i]-llegada[i];
    }
    //ESPERA
    for(var i=1; i<procesos.length; i++){
      tiempoEspera[i] = tiempoRetorno[i]-tiemposRafaga[i];
    }
    //COMIENZO
    for(var i=1; i<procesos.length; i++){
      tiempoComienzo[i] = llegada[i]+tiempoEspera[i];
    }
  }

  function dibujarTabla(){
    var body = document.getElementById("tabla");
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");
   
    for (var j = 0; j < procesos.length; j++) {
      var hilera = document.createElement("tr");   
      for (var i = 0; i < matriz.length; i++){
        var celda = document.createElement("td");
        var textoCelda = document.createTextNode(matriz[i][j]);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
      }   
      tblBody.appendChild(hilera);
    }   
    tabla.appendChild(tblBody);
    body.appendChild(tabla);
    tabla.setAttribute("border", "2");
  }

  function borrarTabla(){
    var tabla = $("#tabla").empty();
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
      lienzo.fillText(i, (i+1)*(tamaño+intervalo)+10, procesos.length*(tamaño+intervalo)+40);
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