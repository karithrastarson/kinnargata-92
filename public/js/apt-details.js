$(document).ready(function () {
  var aptId = getUrlParameter('ibud');
  
  $.getJSON("data/data.json", function(data){
    var found = false;
    for (var i = 0, len = data.length; i < len; i++) {
        var value = data[i];
        if(value.id === aptId) {
            /* Data point found */
            found = true;
            var seld = (String(value.seld).toLowerCase() === "já");
            $("#apt-info-floor-plan").attr('src', 'media/floor-plans/' + aptId+'.png');
            $("#apt-name").text("Íbúð " + value.id + (seld ? " (SELD)":(value.ferli != null ? " (í söluferli)" : "")));
            
            $("#apt-floor").text(value.haed);
            $("#apt-size").text(value.birtflatarmal);
            $("#apt-storage").text(value.geymsla);
            $("#apt-parking").text(value.bilastaedi);
            $('#contact-info').click(function(){
              location.href = "mailto:fyrirspurnir@vesturvik.is?subject=Fyrirspurn um íbúð " + value.id;
            });
            $("#apt-price").text(seld ? "Seld" : (value.ferli != null ? "Í söluferli" : value.verd));
            break;
        }
    }
    if(found === false) {
        // $(".wrapper-item").hide();
        // $("#notfound").show();
    }

}).fail(function(){
    console.log("An error has occurred.");
    // $(".wrapper-item").hide();
    // $("#notfound").show();
});
});


var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
  return false;
};