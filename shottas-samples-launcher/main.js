var eventoControlado = false;
var validadorQ = false;
var validadorA = false;
var idUltimoControl = -1;
var MAX_SHIT = 9;
var MAX_IMG = 17;
var LANZAR_DIRECTO = false;
var interval;
var validadorPATA = false;


window.onload = function() {
  document.onkeypress = mostrarInformacionCaracter;
  asignarFuncionesIniciales();
  $('#contenedorPrincipal').prop('background','assets/fondo14.gif'); // EL GATOO!
}

function asignarFuncionesIniciales(){

$("#stopAll").click( function() {
  pararTodo();
});

$("#partyON").click( function() {
  cargarFondo(true);
});

$("#partyOFF").click( function() {
  partyOff();
});

$("#agregarControl").click( function() {
  agregarControl();
});

$("#laPata").click( function() {
  partyOn();
});

$("#lanzarDirecto").click( function() {
  if (this.checked) {
         LANZAR_DIRECTO = true;
        }else{
          LANZAR_DIRECTO = false;
        }
});

}

function partyOn(){
  if(validadorPATA === false){
    interval = setInterval(function () {cargarFondo(true)}, 0500);
    validadorPATA = true;
  }
}

function partyOff(){
    clearInterval(interval);
    cargarFondo(false);
    validadorPATA = false;
    $('#contenedorPrincipal').prop('background','assets/fondo14.gif'); // EL GATOO
}

function cargarFondo(estado){
  if(estado === true){
    var idFondo = Math.floor(Math.random() * (MAX_IMG-1+1)) + 1;
    var nombreGif = 'assets/fondo' + idFondo + '.gif'
    $('#contenedorPrincipal').prop('background',nombreGif);
  }else{
    $('#contenedorPrincipal').prop('background',"");
  }
}

function mostrarInformacionCaracter(ev) {
                var msg = '';
                var elCaracter = String.fromCharCode(ev.which);
                eventoControlado=true;
                if(ev.keyCode === 32)
                  pararTodo();
                else
                  lanzarSample(elCaracter);
}

function lanzarSample(caracter){
   var control = "control"+caracter;
   var estado = $("#"+control).attr("estado");
   console.log("LANZAR_DIRECTO" + LANZAR_DIRECTO);
   if(LANZAR_DIRECTO === true){
     lanzarDirecto(control);
     $("#"+control).attr("estado",true);
   }else{
      console.log("asdafrsa");
       if(estado === 'true') {
         playPauseSample(control,false);
         $("#"+control).attr("estado",false);
       }else{
         playPauseSample(control,true);
         $("#"+control).attr("estado",true);
       }
   }
}

function lanzarDirecto(nombreControl){
   var componente = $("#"+nombreControl);
   componente.prop("currentTime",0);
   componente.trigger('play');
}

function playPauseSample(nombreControl,esPlay){
   var componente = $("#"+nombreControl);
   if(esPlay) {
     componente.trigger('play');
   }
   else{
     componente.trigger('pause');
     componente.prop("currentTime",0);
   }
}

function pararTodo(){
  for(var i=1; i <= MAX_SHIT ; i++){
    playPauseSample("control"+i,false);
  }
}

function actualizarRutaControl(nombreControl,archivo){
    var objectUrl = URL.createObjectURL(archivo);
    nombreControl = '#' + nombreControl;
    $(nombreControl).prop("src", objectUrl);
    $(nombreControl).trigger('load');
};

function bajarVolumen(nombreControl){
    var volume = audio.prop("volume")-0.2;
    if(volume <0){
        volume = 0;
    }
    $(nombreControl).prop("volume",volume);
}

function agregarControl(){
    if(idUltimoControl >= MAX_SHIT){
      console.log('NO MORE SHIT PLEASE!');
      return;
    }

    idUltimoControl++;
    $("#contenedorControles").append('<br/>  <input type="checkbox" id="check'+idUltimoControl+'"/> <b style="color:red">'+idUltimoControl+'</b> <audio id="control'+idUltimoControl+'" preload="none" estado="false" controls></audio><input type="file" class="claseInput" id="file'+idUltimoControl+'"/>');
    agregarEventoControlFile("file"+idUltimoControl,idUltimoControl);
    agregarEventoCheckLoop("check"+idUltimoControl,idUltimoControl);
}

function agregarEventoControlFile(nombre,numero){
    $("#"+nombre).change(function(e){
      var file = e.currentTarget.files[0];
      actualizarRutaControl('control'+numero,file);
    });
}

function agregarEventoCheckLoop(nombre,numero){
  console.log("agregarEventoCheckLoop "+nombre);
   $("#"+nombre).click(function() {
        if (this.checked) {
          $("#control"+numero).attr("loop","");
        }else{
          $("#control"+numero).removeAttr("loop");
        }
    });
}
