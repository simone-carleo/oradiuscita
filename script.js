document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("inputPause").addEventListener("change", checkPauseValue);
  document.getElementById("inputHour").addEventListener("change", checkHourValue);
  document.getElementById("inputMinute").addEventListener("change", checkMinuteValue);
  document.getElementById("inputJobHours").addEventListener("change", checkHourJobValue);
  document.getElementById("calcButton").addEventListener("click", calcola);
  document.getElementById("currentTimeButton").addEventListener("click", setCurrentTime);

  var oraMinArrivo = parseInt(document.getElementById("inputHour").getAttribute("min"), 10);
  var oraMaxArrivo = parseInt(document.getElementById("inputHour").getAttribute("max"), 10);
  var minutiMaxArrivo = 30;
  var pausaMin = parseInt(document.getElementById("inputPause").getAttribute("min"), 10);
  var pausaMax = parseInt(document.getElementById("inputPause").getAttribute("max"), 10);
  var minutiComplessivi = 480; //8 ore lavorative
  var minutiEffettivi = 0;
  var jobMin = 1;
  var jobMax = parseInt(document.getElementById("inputJobHours").getAttribute("max"), 10);

  checkPauseValue();

  function calcola() {
    var ore = parseInt(document.getElementById("inputHour").value, 10);
    var minuti = parseInt(document.getElementById("inputMinute").value, 10);
    var pausa = parseInt(document.getElementById("inputPause").value, 10);
    var jobHour = parseInt(document.getElementById("inputJobHours").value, 10);
    if (ore != null && ore>0) {
      if (minuti != null && minuti >=0) {
        if (pausa != null) {
            if(minuti >= 0 && minuti < 60){
              var minutiEntrata = ore * 60 + minuti;
              if(minutiEntrata>=(oraMinArrivo*60) && minutiEntrata<=((oraMaxArrivo+minutiMaxArrivo)*60)){
                if(checkPauseValue){
                  if(checkHourJobValue){
                    $('#result').collapse('show');
                    $('#info').collapse('hide');
                    minutiComplessivi = jobHour * 60;
                    minutiEffettivi = minutiComplessivi + minutiEntrata + pausa;
                    var oreFinali = parseInt(minutiEffettivi / 60, 10);
                    if(oreFinali==24){
                      oreFinali = 0;
                    }
                    var minutiFinali = minutiEffettivi % 60;
                    var outputFinale = "";
                    if (oreFinali < 10) {
                      outputFinale += "0";
                    }
                    outputFinale += oreFinali + ":";
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
                  else {
                    showErrorMessage("Il numero di ore lavorative deve essere compresa tra "+jobMin +" e "+jobMax);
                  }
                }
                else{
                  showErrorMessage("La pausa deve essere compresa tra "+pausaMin +" e "+pausaMax+" minuti");
                }
              }
              else {
                showErrorMessage("L'orario d'entrata deve essere compresa tra le "+oraMinArrivo +" e le "+oraMaxArrivo+":"+minutiMaxArrivo);
              }
            }
            else {
              showErrorMessage("I minuti devono essere compresi tra 0 e 59");
            }
        }
        else {
          showErrorMessage("Inserisci la pausa");
        }
      }
      else {
        showErrorMessage("Inserisci i minuti");
      }
    }
    else {
      showErrorMessage("Inserisci le ore");
    }
    
  }

  function showErrorMessage(message){
    document.getElementById("output").innerHTML = "";
    //alert(message);
    document.getElementById("info").innerHTML = message;
    $('#result').collapse('hide');
    $('#info').collapse('show');
  }

  function checkHourJobValue() {
    var inpJobHour = document.getElementById("inputJobHours");
    var jobHour = parseInt(inpJobHour.value, 10);

    if (isNaN(jobHour) || jobHour < 0 || jobHour < jobMin || jobHour > jobMax) {
     inpJobHour.setAttribute("class", "form-control col-md-4 is-invalid");
     return false;
    }
    else {
      inpJobHour.setAttribute("class", "form-control col-md-4 is-valid");
      return true;
    }
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
     inpPause.setAttribute("class", "form-control col-md-6 is-invalid");
     return false;
    }
    else {
      inpPause.setAttribute("class", "form-control col-md-6 is-valid");
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
