
$( document ).ready(function() {
  //Event listener to listen to scroll event
  $('body').on('scroll', function(event) {
    //Change background of nav bar when scrolled
     if ($(this).scrollTop() > 50) {
         $('#scroll').css('display', 'block');
     }
     else {
     $('#scroll').css('display', 'none');
     }
  });

  updateImageMap();
});

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
