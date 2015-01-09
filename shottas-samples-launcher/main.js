var eventoControlado = false;
var validadorQ = false;
var validadorA = false;
var idUltimoControl = 0;
var MAX_SHIT = 10;
var MAX_IMG = 17;

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
  cargarFondo(false);
});

$("#agregarControl").click( function() {
  agregarControl();
});

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
   if(estado === 'true') {
     playPauseSample(control,false);
     $("#"+control).attr("estado",false);
   }else{
     playPauseSample(control,true);
     $("#"+control).attr("estado",true);
   }

   var estado2 = $("#"+control).attr("estado");
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
    $("#contenedorControles").append('<br/>  <input type="checkbox" id="check'+idUltimoControl+'"/> <b>'+idUltimoControl+'</b> <audio id="control'+idUltimoControl+'" preload="none" estado="false" controls></audio><input type="file" id="file'+idUltimoControl+'"/>');
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
          console.log("11111");
        }else{
          console.log("222222");
          $("#control"+numero).removeAttr("loop");
        }
    });
}
