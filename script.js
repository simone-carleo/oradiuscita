document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("inputPause").addEventListener("change", checkPauseValue);
  document.getElementById("inputHour").addEventListener("change", checkHourValue);
  document.getElementById("inputMinute").addEventListener("change", checkMinuteValue);
  document.getElementById("calcButton").addEventListener("click", calcola);
  document.getElementById("currentTimeButton").addEventListener("click", setCurrentTime);

  var oraMinArrivo = 8;
  var oraMaxArrivo = 9;
  var minutiMaxArrivo = 30;
  var pausaMin = 30;
  var pausaMax = 90;
  var minutiComplessivi = 480; //8 ore lavorative
  var minutiEffettivi = 0;

  checkPauseValue();

  function calcola() {
    var ore = parseInt(document.getElementById("inputHour").value, 10);
    var minuti = parseInt(document.getElementById("inputMinute").value, 10);
    var pausa = parseInt(document.getElementById("inputPause").value, 10);
    if (ore != null && ore>0) {
      if (minuti != null && minuti >=0) {
        if (pausa != null) {
            if(minuti >= 0 && minuti < 60){
              var minutiEntrata = ore * 60 + minuti;
              if(minutiEntrata>=480 && minutiEntrata<=570){
                if(checkPauseValue){
                  $('#result').collapse('show');
                  $('#info').collapse('hide');
                  minutiEffettivi = minutiComplessivi + minutiEntrata + pausa;
                  var oreFinali = parseInt(minutiEffettivi / 60, 10);
                  var minutiFinali = minutiEffettivi % 60;
                  var outputFinale = oreFinali + ":";
                  if (minutiFinali < 10) {
                    outputFinale += "0";
                  }
                  outputFinale += minutiFinali;
                  if(isNaN(oreFinali) || isNaN(minutiFinali)){
                    document.getElementById("output").innerHTML = "";
                    document.getElementById("info").innerHTML = "Input non valido";
                  }
                  else {
                    document.getElementById("output").innerHTML = outputFinale;
                    return;
                  }
                }
                else{
                  document.getElementById("output").innerHTML = "";
                  //alert("La pausa deve essere compresa tra "+pausaMin +" e "+pausaMax+" minuti");
                  document.getElementById("info").innerHTML = "La pausa deve essere compresa tra "+pausaMin +" e "+pausaMax+" minuti";
                }
              }
              else {
                document.getElementById("output").innerHTML = "";
                //alert("L'orario d'entrata deve essere compresa tra le "+oraMinArrivo +" e le "+oraMaxArrivo+":"+minutiMaxArrivo);
                document.getElementById("info").innerHTML = "L'orario d'entrata deve essere compresa tra le "+oraMinArrivo +" e le "+oraMaxArrivo+":"+minutiMaxArrivo;
              }
            }
            else {
              document.getElementById("output").innerHTML = "";
              //alert("I minuti devono essere compresi tra 0 e 59");
              document.getElementById("info").innerHTML = "I minuti devono essere compresi tra 0 e 59";
            }
        }
        else {
          document.getElementById("output").innerHTML = "";
          //alert("Inserisci la pausa");
          document.getElementById("info").innerHTML = "Inserisci la pausa";
        }
      }
      else {
        document.getElementById("output").innerHTML = "";
        //alert("Inserisci i minuti");
        document.getElementById("info").innerHTML = "Inserisci i minuti";
      }
    }
    else {
      document.getElementById("output").innerHTML = "";
      //alert("Inserisci le ore");
      document.getElementById("info").innerHTML = "Inserisci le ore";
    }
    $('#result').collapse('hide');
    $('#info').collapse('show');
  }

  function checkPauseValue() {
    var inpPause = document.getElementById("inputPause");
    var pause = parseInt(inpPause.value, 10);
    if (isNaN(pause) || pause < 0 || pause < pausaMin || pause > pausaMax) {
      /*
      alert(
        "La durata della pausa deve essere compresa tra i 30 e i 90 minuti"
      );
      */
     inpPause.setAttribute("class", "form-control col-md-2 is-invalid");
     return false;
    }
    else {
      inpPause.setAttribute("class", "form-control col-md-2 is-valid");
      return true;
    }
  }

  function checkHourValue() {
    var inpHour = (document.getElementById("inputHour"));
    var ora = parseInt(inpHour.value, 10);
    var inpMinute = (document.getElementById("inputMinute"));
    
    checkMinuteValue();
    if (isNaN(ora) || ora < oraMinArrivo || ora > oraMaxArrivo) {
     inpHour.setAttribute("class", "form-control col-md-2 is-invalid");
     inpMinute.setAttribute("class", "form-control col-md-2");
     inpMinute.disabled = true;
     return false;
    }
    else {
      inpHour.setAttribute("class", "form-control col-md-2 is-valid");
      inpMinute.disabled = false;
      if(parseInt(inpMinute.value, 10) == null){
        inpMinute.value = "00";
      }
      if(parseInt(inpHour.value,10)==9){
        inpMinute.setAttribute("max", "30");
      }
      else {
        inpMinute.setAttribute("max", "59");
      }
      return true;
    }
  }

  function checkMinuteValue() {
    var inpMinute = (document.getElementById("inputMinute"));
    var minuti = parseInt(inpMinute.value, 10);
    var max = 59;
    var oraImpostata = parseInt(document.getElementById("inputHour").value, 10);
    if(oraImpostata==oraMaxArrivo){
      max = minutiMaxArrivo;
    }
    //alert(minuti);
    inpMinute.setAttribute("max", max);
    if (isNaN(minuti) || minuti==null || minuti < 0 || minuti > max) {
      inpMinute.setAttribute("class", "form-control col-md-2 is-invalid");
      return false;
    }
    else {
      inpMinute.setAttribute("class", "form-control col-md-2 is-valid");
      return true;
    }
  }

  function setCurrentTime(){
    var current = new Date();
    document.getElementById("inputHour").value = current.getHours();
    document.getElementById("inputMinute").value = current.getMinutes();
    checkHourValue();
  }


  //document.getElementById("output").innerHTML = "Documento caricato";
});
