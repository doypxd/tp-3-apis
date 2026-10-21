const contenedorDeportes = document.getElementById("deportes");
const contenedorLigas = document.getElementById("ligas");
let deporteActual = -1;

contenedorDeportes.addEventListener('click', (event) => {
    const article = event.target.closest('article.cuadricula-item');
    if (article) {
        const articuloAnterior = contenedorDeportes.querySelector('.cuadricula-item.seleccionado');

        // Quitar el outline a el anterior
        if (articuloAnterior) {
            articuloAnterior.classList.remove('seleccionado');
        }

        // Agregar outline
        article.classList.add('seleccionado');
        const id = article.dataset.id;
        deporteActual = id;
        mostrarLigas()
    }
});

async function mostrarDeportes() {
    const deportesFetch = await fetch("https://www.thesportsdb.com/api/v1/json/123/all_sports.php")
    const deportes = await deportesFetch.json()
    let htmlDeportes = "";
    deportes.sports.forEach(element => {
        htmlDeportes += `
            <article class="cuadricula-item" data-id="${element.strSport}">
                <div>
                <img src="${element.strSportIconGreen}">
                <h3>${element.strSport}</h3>
                </div>
            </article>
        `
    });
    contenedorDeportes.innerHTML = htmlDeportes
}
async function mostrarLigas() {
    const ligasFetch = await fetch("https://www.thesportsdb.com/api/v1/json/123/search_all_leagues.php?s=" + deporteActual)
    const ligas = await ligasFetch.json()
    let htmlLigas = "";
    ligas.countries.forEach(element => {
        htmlLigas += `
            <article class="cuadricula-item" data-id="${element.idLeague}">
                <div>
                <img src="${element.strLogo}">
                <h3>${element.strLeague}</h3>
                </div>
            </article>
        `
    });
    contenedorLigas.innerHTML = htmlLigas
}

// Renderizar deportes
mostrarDeportes()