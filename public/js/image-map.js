function updateImageMap() {

    $.getJSON("data/experimental-map.json", function (mapdata) {
            initMap(mapdata);
        }
    ).fail(function () {
        console.log("An error has occurred loading image map");
    });

    ImageMapPro.subscribe((action) => {
        console.log("type:" + action.type + " payload:" + JSON.stringify(action.payload));
        if (action.type === 'objectClick' && action.payload.object.length === 7) {
            console.log("match:" + action.payload.object);
            var houseNr = action.payload.object.slice(0, 2);
            var aptNr = action.payload.object.slice(3, 7);
            changeArtboard(houseNr);
            revealApt(houseNr, aptNr);
        }
    });
}

function revealApt(houseNr, aptNr) {
    //Set display block on apt-view
    var href="upplysingar.html?hus="+houseNr+"&ibud="+aptNr+""
    $("#front-page-apt-view img").attr('src', 'media/images/floor-plans/'+houseNr+'/'+aptNr+'.jpg');
    $("#front-page-apt-view img").attr('onclick', "location.href='"+href+"'");
    $("#front-page-apt-view-title").text("Áshamar "+houseNr+" - Íbúð "+aptNr);
    $("#front-page-apt-view-button").attr('onClick', "location.href='" + href + "'");
    $("#front-page-apt-view").removeClass("hide");

    //Get scrolltop position of element
    var y = document.getElementById("front-page-apt-view").offsetTop;
    $('html, body').animate({scrollTop: y}, 800);


}

function initMap(mapdata) {
    ImageMapPro.init('#image-map-pro', mapdata);
}

function changeArtboard(housenr) {
    ImageMapPro.changeArtboard('ashamar-project','Áshamar '+housenr);
}