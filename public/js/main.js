$( document ).ready(function() {
  //Event listener to listen to scroll event
  populateGallery();
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



});

function populateGallery() {
  //Load data json file and loop through the data to populate the gallery
  $.getJSON('data/data.json', function(data) {
    var aptGallery = "";
    for (var i = 0, len = data.length; i < len; i++) {
      var value = data[i];
      var details ='<p><i class="fa fa-bed"></i>' + value.herbergi + ' herbergi</p><p><i class="fas fa-ruler-combined"></i>' + value.birtflatarmal + ' fermetrar</p><p><i class="fas fa-parking"></i>' + value.bilastaedi + ' bílastæði</p><p><i class="fas fa-coins"></i>' + value.verd + ' m.kr</p><button class="card-button">Nánar</button>'
      var detailsContainer = $('#apt-'+value.ibudnr+' > div');
      detailsContainer.html(details);
      var detailsContainer = $('#apt-'+value.ibudnr).attr('data-stada', value.stada);
    }

    $('area').click(function(e) {
      var ibudNr = e.target.alt;
      var card = $('#apt-'+ibudNr);
       var itemPosition = card.offset().left;
       var scrollPosition = itemPosition - ($(window).width() / 2) + (card.outerWidth() / 2);

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
