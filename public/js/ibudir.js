$(document).ready(function () {

    //Add event listener to rows. When row is clicked, then add class selected to it
    $(document).on('click', '.apt-row', function () {
        $(this).toggleClass('selected');
    });
  
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
          <td data-th="Íbúð">
              ${value.ibudnr}
          </td>
          <td data-th="Hæð">
              ${value.haed}
          </td>
          <td data-th="Herbergi">
              ${value.herbergi}
          </td>
          <td data-th="Bílastæði í kjallara">
              ${value.bilastaedi}
          </td>
          <td data-th="Birtir fermetrar">
              ${value.birtflatarmal}
          </td>
          <td data-th="Verð">
              ${seld ? "Seld" : (value.ferli != null ? "Í ferli" : value.verd)}
          </td>
          <td data-th="Nánar" data-img="media/images/floor-plans/${value.husnr}/${value.ibudnr}.jpg">
              <a class="more-info" data-href="upplysingar.html?hus=${value.husnr}&ibud=${value.ibudnr}"><i class="fa fa-eye ${seld ? "seld" : ""}"></i></a>
          </td>
      </tr>`

          $('#apt-table tbody tr:last').after(row);
        }
    }
  });
}

