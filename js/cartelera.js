let movies = [];
const API_KEY = '8fd6656c90799f32dd88ee15c3c62ae6';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`; 


async function fetchMovies() {
    await fetch(API_URL)
    .then(res => res.json())
    .then(json => movies = json.results)
    .then(renderMovies)
    .catch(error => { console.log(error)});
    }

function renderMovies() {
    for (let i = 0; i < 6; i++) {
        let div = document.createElement('div');
        div.classList.add('movie');
        let poster = document.createElement('img'); 
        poster.classList.add('poster');
        poster.src = `https://image.tmdb.org/t/p/w500${movies[i].poster_path}`;
        div.appendChild(poster);
        let info = document.createElement('div');
        info.classList.add('info');
        let available = Math.floor(Math.random() * 21);
        infoHTML = `<p class="title">${movies[i].title}</p>
        <p class="desc">${movies[i].overview}</p>
        <p><small class="available">${available} entradas disponibles.</small></p>
        <button class="btn btn-light buy">COMPRAR ENTRADA</button>`
        info.innerHTML = infoHTML;
        div.appendChild(info);        

        $(".movies").append(div);
    }
}

fetchMovies();

