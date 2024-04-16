$(document).ready(function () {

    var modal = document.getElementById("apt-modal");
  // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];


    //Add event listener to rows. When row is clicked, then add class selected to it
    $(document).on('click', '.apt-row', function () {
        // Get the modal
        $(this).toggleClass('selected');
        console.log("clicked on " + $(this).find('td:first').text());
      
        var aptNr = $(this).find('td:first').text();
        console.log("apt nr: " + aptNr);
        var imgLink = "media/floor-plans/" + aptNr + ".png";
        var detailsLink = "/upplysingar.html?ibud=" + aptNr;
        modal.style.display = "block";
        $('.modal-content img').attr('src', imgLink);
        $('.modal-conetnt a').attr('href',detailsLink);
    });

    $(document).on('click', '.close', function(){
      modal.style.display = "none";
      $('.apt-row').removeClass('selected');
    });
    // When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    //remove class 'selected' from all lines
    $('.apt-row').removeClass('selected');
  }
}
  
  $('#hidesold').change(
    function(){
        if ($(this).is(':checked')) {
            updateTable(hidesold=true);
        }
        else {
          console.log("unchecked");
          updateTable(hidesold=false);

        }
    });

updateTable();
});

function updateTable(hidesold=false, sortBy="default") {    
    $(".apt-row").remove();
    
  $.getJSON("data/data.json", function (data) {  

    if(sortBy != "default") {
      $('#filter-apt').removeClass('asc');
      $('#filter-apt').removeClass('desc');
      $('#filter-size').removeClass('asc desc');
      $('#filter-price').removeClass('asc desc');
    switch (sortBy) {
      case "apt":
        data.sort(function (a, b) {
          return a.ibudnr - b.ibudnr;
        });
        var order = $('#filter-apt').data('sort');
        if (order === "asc") {
          data.reverse();
          $('#filter-apt').data('sort', 'desc');
          $('#filter-apt').addClass('desc');
        }
        else {
          $('#filter-apt').data('sort', 'asc');
          $('#filter-apt').addClass('asc');
        }
        break;
      case "size":
        data.sort(function (a, b) {
          return a.birtflatarmal - b.birtflatarmal;
        });
        var order = $('#filter-size').data('sort');
        if (order === "asc") {
          data.reverse();
          $('#filter-size').data('sort', 'desc');
          $('#filter-size').addClass('desc');
        }
        else {
          $('#filter-size').data('sort', 'asc');
          $('#filter-size').addClass('asc');
        }
        break;
      case "price":
        data.sort(function (a, b) {
          return a.verd - b.verd;
        });
        var order = $('#filter-price').data('sort');
        if (order === "asc") {
          data.reverse();
          $('#filter-price').data('sort', 'desc');
          $('#filter-price').addClass('desc');
        }
        else {
          $('#filter-price').data('sort', 'asc');
          $('#filter-price').addClass('asc');
        }
        break;
      default:
        break;
    }
  }

    for (var i = 0, len = data.length; i < len; i++) {
      var value = data[i];
      var seld = (String(value.seld).toLowerCase() === "já");
      
      if (hidesold && seld) {
        continue;
      }
      else {
      var ferli = (value.ferli != null) ? "ferli" : ""; 
    
          var row = `
      <tr class="apt-row ${seld ? "seld" : ""} ${ferli ? "ferli" : ""}" data-size="${Math.ceil(parseFloat(value.staerd))}">
          <td data-th="Íbúð">${value.ibudnr}</td>
          <td data-th="Hæð">${value.haed}</td>
          <td data-th="Herbergi">${value.herbergi}</td>
          <td data-th="Bílastæði í kjallara">${value.bilastaedi}</td>
          <td data-th="Birtir fermetrar">${value.birtflatarmal}</td>
          <td data-th="Verð">${seld ? "Seld" : (value.ferli != null ? "Í ferli" : value.verd)}</td>
      </tr>`

          $('#apt-table tbody tr:last').after(row);
        }
    }
  });
}

