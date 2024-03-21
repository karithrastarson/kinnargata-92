$( document ).ready(function() {
  //Event listener to listen to scroll event
  
  $('body').on('scroll', function(event) {
    //Change background of nav bar when scrolled
     if ($(this).scrollTop() > 50) {
         $('#scroll').css('background', 'var(--main)');
         $('.topnav a').animate({
 
      }, 500);
     }
     else {
     $('#scroll').css('background', 'linear-gradient(to bottom, var(--main), transparent)');
     $('.topnav a').animate({

  }, 500);
     }
  });
  

  $('#building-map').imageMapResize();
  $('#building').maphilight(
      {
          fillColor: '00ff00',
          fillOpacity: 0.7,
          strokeColor: '000000'
      }
  );
  
  $.when(populateGallery()).done(function(){
    $('area').mousedown(function(e) {
      e.preventDefault();
      //console.log("mousedown: " + e.target.alt);
      var ibudNr = e.target.alt;
      var card = $('#apt-'+ibudNr);
      var itemPosition = card.offset().left;
      card.toggleClass('selected');
      //var itemPosition = $('#apt-303').position().left; // Replace '#item' with the selector for the specific item
      $('.apt-scroller').animate({scrollLeft: itemPosition}, 'slow');
  });

  $('.apt-details').click(function(e) {
    $(this).toggleClass('selected');
  });
});

});

function populateGallery() {
  //Load data json file and loop through the data to populate the gallery
  $.getJSON('data/data.json', function(data) {
    var aptGallery = "";
    for (var i = 0, len = data.length; i < len; i++) {
      var value = data[i];
      var details ='<p>Herbergi: ' + value.herbergi + '</p><p>Verð: ' + value.verd + '</p><p>Fermetrar: ' + value.birtflatarmal + '</p><p>Bílastæði: ' + value.bilastaedi + '</p>'
      var detailsContainer = $('#apt-'+value.ibudnr+' > div');
      detailsContainer.html(details);
      var detailsContainer = $('#apt-'+value.ibudnr).attr('data-stada', value.stada);
    }
    
    });
    
  
}

function burgerCLick(x) {
  x.classList.toggle("change");
  $('.topnav').toggleClass("show")
}

function toggleShow(x) {
    $('.topnav').toggleClass("show")
    $('.burger').toggleClass("change");
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
