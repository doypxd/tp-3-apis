const contenedorDeportes = document.getElementById("deportes");
const contenedorLigas = document.getElementById("ligas");
const detalles = document.getElementById("detallesLiga");

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
  const paises = ["England", "Spain", "Italy", "Germany", "France", "Portugal"];
  // La API no es tan permisiva, solo da hasta 10 items salvo si pago,
  // asi que tengo que definir paises de interes.
  let htmlLigas = ``;

  for (const pais of paises) {
    let ligasFetch;
    if (deporteActual === "Soccer") {
      ligasFetch = await fetch("https://www.thesportsdb.com/api/v1/json/123/search_all_leagues.php?s=" + deporteActual + "&c=" + pais);
    } else {
      ligasFetch = await fetch("https://www.thesportsdb.com/api/v1/json/123/search_all_leagues.php?s=" + deporteActual);
    }
    const ligas = await ligasFetch.json()
    ligas.countries.forEach(element => {
      let logo = `<img src="${element.strLogo}">`;
      if (!element.strLogo) {
        logo = "<small>Sin logo</small>"
      }
      htmlLigas += `
            <article class="cuadricula-item" data-id="${element.idLeague}">
                <div>
                ${logo}
                <h3>${element.strLeague}</h3>
                </div>
            </article>
        `
    });
    if (!(deporteActual === "Soccer")) {
      break;
    };
  }
  contenedorLigas.innerHTML = htmlLigas

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
          <h3>Videos</h3><small>(pueden no cargar, la API no te da lista es uno por uno y su ratelimiting es molesto) Aparecen con delay, se fetchean dia por dia.<br>Es posible que no carguen bien los embeds y tengas que usar "Ver en Youtube", pero los IDS son correctos y tocar ese boton te envia a la pagina de youtube a ver el video correcto. Supuestamente los embeds no cargan por el copyright de los highlights.</small>
        </div>    `;
  for (const dia of [24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336]) {
    let fecha = new Date();
    fecha.setHours(fecha.getHours() - dia);
    const string = fecha.toISOString().slice(0, 10);
    await delay(1000);
    const highlightsFetch = await fetch("https://www.thesportsdb.com/api/v1/json/123/eventshighlights.php?d=" + string + "&l=" + liga.idLeague);
    const highlights = await highlightsFetch.json();
    if (highlights.tvhighlights) {
    highlights.tvhighlights.forEach(highlight => {
      let partes;
      if (highlight.strVideo.includes("v=")) {
        partes = highlight.strVideo.split("v=")[1];
      } else {
        partes = highlight.strVideo.split("/").pop();
      }
      const videoId = partes.substring(0, 11);

      const iframeHTML = `<h3>${highlight.strEvent}</h3>
                                      <iframe 
                                      width="100%" 
                                      height="395"  
                                      src="https://youtube.com/embed/${videoId}" 
                                       frameborder="0" 
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                       allowfullscreen>
                                      </iframe>
                                      <a href="https://youtube.com/watch?v=${videoId}"><button>Ver en youtube</button></a>
                                `
      detalles.insertAdjacentHTML('beforeend', iframeHTML);
      })

      }
  }

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
mostrarDeportes(); 