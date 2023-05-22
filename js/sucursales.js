let map;
let marker;

function showMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initMap)
    } else {
        console.log("Sin acceso a geolocalización");
    }

    function initMap(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        macc = { lat: latitude, lng: longitude }
        map = new google.maps.Map(document.getElementById("map"), {zoom: 17, center: macc});
        marker = new google.maps.Marker({position: macc, map: map});
    }
}

showMap();
