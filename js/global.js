const hours = new Date().getHours();
const minutes = new Date().getMinutes();
const CLIMA_API_KEY = '023841607b2cb56fe936c1d86083f25a';
const localTheme = localStorage.getItem('dark_mode') === 'true';

if (localStorage.getItem("dark_mode") === null) {
    localStorage.setItem("dark_mode", "false");
}

function renderNav() {
    const nav = `
                    <ul id="info-nav">
                        <li id="hora"> ${ hours < 10 ?  `0${hours}` : `${hours}` }: ${ minutes < 10 ? `0${minutes}` : `${minutes}` }</li>
                        <li id="clima"></li>
                    </ul>
                    <ul id="menu-list" class="d-flex">
                    <li class="list-item"><a href="../index.html"><span id="home-btn" class="material-symbols-outlined">home</span></a></li>               
                    <li class="list-item"><a href="../cartelera.html">Cartelera</a></li>
                    <li class="list-item"><a href="../sucursales.html">Sucursales</a></li>
                    <img src="../assets/images/logo.png" class="nav-logo" alt="CINE KONG LOGO" />
                    <li class="list-item"><a href="../contacto.html">Contacto</a></li>
                    <li class="list-item"><a href="../nosotros.html">Nosotros</a></li>
                    <li class="list-item" id="theme-btn" ><span class="material-symbols-outlined">${ localTheme ? "light_mode" : "dark_mode"}</span></li>
                </ul>`;
    $("#navbar").append(nav);
}

function getClima() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(ok)
    } else {
        console.log("Sin acceso a geolocalización");
    }

    function ok(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${CLIMA_API_KEY}&units=metric&lang=es`;

        fetch(URL)
        .then( res => res.json())
        .then ( data => mostrarDatos(data))
    }


    function mostrarDatos(data) {
        $("#clima").append(`Clima actual: ${data.main.temp} °C <span class="frase">!PERFECTO PARA IR AL CINE :)!</span>`);
    }
}

renderNav();
getClima();

function renderTime() {
    const hora = document.getElementById('hora');

    setInterval(() => {
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const time = `${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}`;

        hora.innerHTML = `<li>${time}</li>`;
    }, 1000);
}

renderTime();


window.addEventListener('DOMContentLoaded', function() {
    const localTheme = localStorage.getItem('dark_mode') === 'true';
    if (localTheme) {
        document.body.classList.add('dark-mode');

    } else {
        document.body.classList.remove('dark-mode');
    }
})


$("#theme-btn").click(function() {
    
    $(".main").toggleClass("dark-mode");
    if (localStorage.getItem("dark_mode") === "true") {
        localStorage.setItem("dark_mode", "false");
        let iconHtml = '<span class="material-symbols-outlined">dark_mode</span>';
        $("#theme-btn").html(iconHtml);
        
    } else {
        localStorage.setItem("dark_mode", "true");
        let iconHtml = '<span class="material-symbols-outlined">light_mode</span>';
        $("#theme-btn").html(iconHtml);
    }
});
