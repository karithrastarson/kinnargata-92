$( document ).ready(function() {
  var sala = getUrlParameter('sala');
  if (sala !== false){
    localStorage.setItem("sala", sala);
}
var soluRedirect = localStorage.getItem("sala");
            $("#hraunhamar-1").hide();
            $("#hraunhamar-2").hide();
            $("#hraunhamar-3").hide();
            $("#hraunhamar-4").hide();
switch(soluRedirect) {
    case "as":
        $("#as").show();
        $("#torg").hide();
        $("#hraunhamar").hide();
        break;
    case "torg":
        $("#torg").show();
        $("#as").hide();
        $("#hraunhamar").hide();
        break;
    case "hraunhamar":
            $("#hraunhamar").show();
            $("#hraunhamar-1").show();
            $("#hraunhamar-2").show();
            $("#hraunhamar-3").show();
            $("#hraunhamar-4").show();
            $("#torg").hide();
            $("#as").hide();
            break;
    default:
        $("#torg").show();
        $("#as").show();
        $("#hraunhamar").show();
        break;
}

        /*Remove query parameter from page*/
        var uri = window.location.href.toString();
        if (uri.indexOf("?") > 0) {
            var clean_uri = uri.substring(0, uri.indexOf("?"));
            window.history.replaceState({}, document.title, clean_uri);
        }

  //Event listener to listen to scroll event
  populateGallery();
  $('body').on('scroll', function(event) {
    //Change background of nav bar when scrolled
     if ($(this).scrollTop() > 50) {
         $('#scroll').css('background', 'transparent');
        $('.bar1, .bar2,.bar3').css('background-color', 'var(--secondary)');
         $('.topnav a').animate({
 
      }, 500);
     }
     else {
     $('#scroll').css('background', 'var(--secondary)');
     $('.bar1, .bar2,.bar3').css('background-color', 'var(--main)');
     $('.topnav a').animate({

  }, 500);
     }
  });
  
  updateColor();
  
  
  $('#building').maphilight(
      {
          fillColor: '00ff00',
          fillOpacity: 0.3,
          strokeOpacity: 0.1,
      }
  );

  $('#building-map').imageMapResize();

});

function updateColor() {
  var yellow = "FFFF00";
  var red = "FF0000";
  var green = "00FF00";

  $.getJSON('data/data.json', function(data) {  
    for (var i = 0, len = data.length; i < len; i++) {
      var value = data[i];
      var stada =  String(value.stada).toLowerCase();
      color = "00ff00";
      switch (stada) {
        case "frátekin":
          color = yellow;
          break;
        case "seld":
          color = red;
          break;
        default:
          color = green;
      } 
      
      var maphilight = '{"fillColor":"' + color + '"}'
      $('#'+value.ibudnr).attr('data-maphilight', maphilight);
    }
  });

}

function populateGallery() {
  //Load data json file and loop through the data to populate the gallery
  $.getJSON('data/data.json', function(data) {
    var aptGallery = "";
    for (var i = 0, len = data.length; i < len; i++) {
      var value = data[i];
      var seld = (String(value.seld).toLowerCase() === "já");
      var ferli =  !(String(value.stada).toLowerCase() === "laus");
      var verd = (ferli) ?  "Í söluferli" : value.verd + "m kr.";
      if (seld) {
        verd = "SELD";
      }

      var details ='<p><i class="fa fa-bed"></i>' + value.herbergi + ' herbergi</p><p><i class="fas fa-ruler-combined"></i>' + value.birtflatarmal + ' fermetrar</p><p><i class="fas fa-parking"></i>' + value.bilastaedi + ' bílastæði</p><p><i class="fas fa-coins"></i>' + verd + '</p><a href="ibud.html?ibud=' + value.ibudnr + '" class="card-button">Nánar</a>'
      var detailsContainer = $('#apt-'+value.ibudnr+' > div');
      detailsContainer.html(details);
      var detailsContainer = $('#apt-'+value.ibudnr).attr('data-stada', value.stada);
    }

    $('area').click(function(e) {
      var ibudNr = e.target.alt;
      $('area').mouseout();
      $('[title='+ibudNr+']').mouseover();
      var card = $('#apt-'+ibudNr); 
      var index = card.index();
      var itemWidth = $('.apt-details').outerWidth(true); // Get the width of a slider item, including margins
      var scrollPosition = itemWidth * index;

      $('.apt-details').removeClass('selected');
      card.toggleClass('selected');
      console.log("scroll to " + ibudNr + " at " + scrollPosition);
      $('.apt-scroller').animate({scrollLeft: scrollPosition}, 'slow');
  });
  
    $('.apt-details').click(function(e) {
      $('.apt-details').removeClass('selected');
      $(this).toggleClass('selected');
      var ibudNr = $(this).attr('id').split('-')[1];
      console.log("clicked on " + ibudNr);
      $('area').mouseout();
      $('[title='+ibudNr+']').mouseover();
    });
    
    });
    
  
}

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

function burgerCLick(x) {
  x.classList.toggle("change");
  if ($('.topnav').hasClass("show")) {
    $('.topnav').removeClass("show").hide();
  } else {
    $('.topnav').addClass("show").hide().fadeIn(250);
  }
}


function toggleFullscreen(x) {
    //If x has src attribute, set the src of the fullscreenview to x.src
    if (x.hasAttribute('src')) {
        console.log(x.src);
        $('.fullscreenview').css('background-image',  "url(" + x.src + ")");
        $('.fullscreenview').css("display", "flex").hide().fadeIn(200);
    }
    else {
        $('.fullscreenview').css("display", "none");
    }
}
