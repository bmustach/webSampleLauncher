var eventoControlado = false;
var validadorQ = false;
var validadorA = false;

window.onload = function() {
document.onkeypress = mostrarInformacionCaracter;

$("#fileq").change(function(e){
    var file = e.currentTarget.files[0];
    actualizarRutaControl('controlq',file);
});

$("#filea").change(function(e){
    var file = e.currentTarget.files[0];
    actualizarRutaControl('controla',file);
});

}

function actualizarRutaControl(nombreControl,archivo){
    var objectUrl = URL.createObjectURL(archivo);
    nombreControl = '#' + nombreControl;
    $(nombreControl).prop("src", objectUrl);
    $(nombreControl).trigger('load');
};

function mostrarInformacionCaracter(evObject) {
                var msg = '';
                var elCaracter = String.fromCharCode(evObject.which);
                eventoControlado=true;
                lanzarSample(elCaracter);
}

function lanzarSample(caracter){
   var control = "control"+caracter;

   if(caracter === 'q' && validadorQ == false) {
     validadorQ = true;
     playPauseSample(control,true);
   }else if(caracter == "q" && validadorQ == true){
    validadorQ = false;
    playPauseSample(control,false);
   }

   if(caracter === 'a' && validadorA == false) {
     validadorA = true;
     playPauseSample(control,true);
   }else if(caracter == "a" && validadorA == true){
    validadorA = false;
    playPauseSample(control,false);
   }
}

function playPauseSample(nombreControl,esPlay){
   var componente = document.getElementById(nombreControl);
   if(esPlay) {
     componente.play();
   }
   else{
     componente.pause();
     componente.currentTime = 0 ;
   }
}