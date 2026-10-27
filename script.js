const contenedorDeportes = document.getElementById("deportes");
const contenedorLigas = document.getElementById("ligas");
const detalles = document.getElementById("detallesLiga");

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
async function detallesLiga(id) {
  const ligaFetch = await fetch(`https://thesportsdb.com{id}`);
  const data = await ligaFetch.json();

  // Validar si la API devolvió la liga y no hay un error
  if (!data.leagues) {
    detalles.innerHTML = `<p>No se encontró la liga con el ID ${id}</p>`;
    return;
  }

  const liga = data.leagues[0];

  // Lista de propiedades de imágenes que quieres mostrar
  const imagenes = [
    liga.strLogo,
    liga.strFanart1,
    liga.strFanart2,
    liga.strFanart3,
    liga.strFanart4
  ];

  let imagenesHTML = '';

  // Usamos for...of para recorrer las imágenes
  for (const img of imagenes) {
    // Si la imagen NO es null, undefined o vacía, la agregamos
    if (img) {
      imagenesHTML += `<img src="${img}" alt="Imagen de ${liga.strLeague}">`;
    }
  }

  // Verificar si hay descripción (asumiendo que la propiedad es strDescriptionEN o similar, si no existe se avisa)
  const descripcion = liga.strDescriptionEN || "No hay descripción disponible para esta liga.";

  detalles.innerHTML = `
    <article class="cuadricula-item" data-id="${liga.idLeague}">
      <div>
        <h3>${liga.strLeague}</h3>
        <p>${descripcion}</p>
        <div class="contenedor-imagenes">
          ${imagenesHTML}
        </div>
      </div>
    </article>
  `;
}

async function detallesLiga(id) {
    const ligaFetch = await fetch("https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=" + id)
    const data = await ligaFetch.json();
    if (!data.leagues) {
      detalles.innerHTML = `<p>No se encontró la liga con el ID ${id}</p>`;
      return;
    }
    const liga = data.leagues[0];
    const imagenes = [
      liga.strLogo,
      liga.strFanart1,
      liga.strFanart2,
      liga.strFanart3,
      liga.strFanart4
    ];
    let imagenesHTML = '';
    for (const img of imagenes) {
      if (img) {
        imagenesHTML += `<img src="${img}" alt="Imagen de ${liga.strLeague}">`;
      }
    }
    const descripcion = liga.strDescriptionEN || "No hay descripción disponible para esta liga.";
    detalles.innerHTML = `
        <div>
          <h3>${liga.strLeague}</h3>
          <p>${descripcion}</p>
          <div class="contenedor-imagenes">
            ${imagenesHTML}
          </div>
        </div>    `;
  }
  

contenedorLigas.addEventListener('click', (event) => {
    const article = event.target.closest('article.cuadricula-item');
    if (article) {
        const articuloAnterior = contenedorLigas.querySelector('.cuadricula-item.seleccionado');

        // Quitar el outline a el anterior
        if (articuloAnterior) {
            articuloAnterior.classList.remove('seleccionado');
        }

        // Agregar outline
        article.classList.add('seleccionado');
        const id = article.dataset.id;
        detallesLiga(id);
    }
});






// Renderizar deportes
mostrarDeportes()