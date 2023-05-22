$(document).ready(function() {
    setTimeout(() => {
        $(".loading-screen").fadeOut("slow");
        setTimeout( () => {
            $(".loading-screen").remove();
            $(".content").css("display", "flex");
        }, 1000)
    }, 2000);
});

let cartelera = [];
const API_KEY = '8fd6656c90799f32dd88ee15c3c62ae6';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`; 

async function fetchApi() {
    await fetch(API_URL)
    .then ( res => res.json())
    .then ( json => cartelera.push(json.results) )
    .then( console.log(cartelera))

    for ( let i = 15; i <= 19; i++ ) {
        let path = `https://image.tmdb.org/t/p/w500${cartelera[0][i].poster_path}`;
        $(`#img-${i}`).attr('src', path)
    }
    
}
fetchApi();


/* 
let carouselCard = document.createElement('div');
carouselCard.classList.add('carousel-item');
carouselCard.classList.add('col-12');
const movieCard = `
<img src= https://image.tmdb.org/t/p/w500${cartelera[i].poster_path} class = "poster" />`;
carouselCard.innerHTML = movieCard;
$("#carrusel").append(carouselCard) */