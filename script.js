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
  const deportes = [ // Como la API solo expone dos deportes debo usar IA con el HTML del selector de deportes de su demostración de la API para tener todos los deportes
    { "nombre": "soccer", "icono": "/images/icons/svg/sports/soccer.svg" },
    { "nombre": "motorsport", "icono": "/images/icons/svg/sports/motorsport.svg" },
    { "nombre": "fighting", "icono": "/images/icons/svg/sports/fighting.svg" },
    { "nombre": "baseball", "icono": "/images/icons/svg/sports/baseball.svg" },
    { "nombre": "basketball", "icono": "/images/icons/svg/sports/basketball.svg" },
    { "nombre": "american-football", "icono": "/images/icons/svg/sports/american-football.svg" },
    { "nombre": "ice-hockey", "icono": "/images/icons/svg/sports/ice-hockey.svg" },
    { "nombre": "golf", "icono": "/images/icons/svg/sports/golf.svg" },
    { "nombre": "rugby", "icono": "/images/icons/svg/sports/rugby.svg" },
    { "nombre": "tennis", "icono": "/images/icons/svg/sports/tennis.svg" },
    { "nombre": "cricket", "icono": "/images/icons/svg/sports/cricket.svg" },
    { "nombre": "cycling", "icono": "/images/icons/svg/sports/cycling.svg" },
    { "nombre": "australian-football", "icono": "/images/icons/svg/sports/australian-football.svg" },
    { "nombre": "esports", "icono": "/images/icons/svg/sports/esports.svg" },
    { "nombre": "volleyball", "icono": "/images/icons/svg/sports/volleyball.svg" },
    { "nombre": "netball", "icono": "/images/icons/svg/sports/netball.svg" },
    { "nombre": "handball", "icono": "/images/icons/svg/sports/handball.svg" },
    { "nombre": "snooker", "icono": "/images/icons/svg/sports/snooker.svg" },
    { "nombre": "field-hockey", "icono": "/images/icons/svg/sports/field-hockey.svg" },
    { "nombre": "darts", "icono": "/images/icons/svg/sports/darts.svg" },
    { "nombre": "athletics", "icono": "/images/icons/svg/sports/athletics.svg" },
    { "nombre": "badminton", "icono": "/images/icons/svg/sports/badminton.svg" },
    { "nombre": "climbing", "icono": "/images/icons/svg/sports/climbing.svg" },
    { "nombre": "equestrian", "icono": "/images/icons/svg/sports/equestrian.svg" },
    { "nombre": "gymnastics", "icono": "/images/icons/svg/sports/gymnastics.svg" },
    { "nombre": "shooting", "icono": "/images/icons/svg/sports/shooting.svg" },
    { "nombre": "extreme-sports", "icono": "/images/icons/svg/sports/extreme-sports.svg" },
    { "nombre": "table-tennis", "icono": "/images/icons/svg/sports/table-tennis.svg" },
    { "nombre": "multi-sports", "icono": "/images/icons/svg/sports/multi-sports.svg" },
    { "nombre": "watersports", "icono": "/images/icons/svg/sports/watersports.svg" },
    { "nombre": "weightlifting", "icono": "/images/icons/svg/sports/weightlifting.svg" },
    { "nombre": "skiing", "icono": "/images/icons/svg/sports/skiing.svg" },
    { "nombre": "skating", "icono": "/images/icons/svg/sports/skating.svg" },
    { "nombre": "wintersports", "icono": "/images/icons/svg/sports/wintersports.svg" },
    { "nombre": "lacrosse", "icono": "/images/icons/svg/sports/lacrosse.svg" },
    { "nombre": "gambling", "icono": "/images/icons/svg/sports/gambling.svg" },
    { "nombre": "gaelic", "icono": "/images/icons/svg/sports/gaelic.svg" }
  ]
  let htmlDeportes = "";
  deportes.forEach(deporte => {
  htmlDeportes += `
             <article class="cuadricula-item" data-id="${deporte.nombre}">                 <div>
                 <img src="https://thesportsdb.com${deporte.icono}">
                 <h3>${deporte.nombre.charAt(0).toUpperCase() + deporte.nombre.slice(1)}</h3>
                 </div>
             </article>
  `
  })
  contenedorDeportes.innerHTML = htmlDeportes
}

// async function mostrarDeportes() {
//   const deportesFetch = await fetch("https://www.thesportsdb.com/api/v1/json/123/all_sports.php")
//   const deportes = await deportesFetch.json()
//   let htmlDeportes = "";
//   deportes.sports.forEach(element => {
//     htmlDeportes += `
//             <article class="cuadricula-item" data-id="${element.strSport}">
//                 <div>
//                 <img src="${element.strSportIconGreen}">
//                 <h3>${element.strSport}</h3>
//                 </div>
//             </article>
//         `
//   });
//   contenedorDeportes.innerHTML = htmlDeportes
// }
async function mostrarLigas() {
  const paises = ["England", "Spain", "Italy", "Germany", "France", "Portugal"];
  // La API no es tan permisiva, solo da hasta 10 items salvo si pago,
  // asi que tengo que definir paises de interes.
  let htmlLigas = ``;

  for (const pais of paises) {
    let ligasFetch;
    if (deporteActual === "soccer") {
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
    if (!ligasFetch.ok) {
      alert("Error " + ligasFetch.status);
    }
    if (!(deporteActual === "soccer")) {
      break;
    };
  }
  contenedorLigas.innerHTML = htmlLigas

}

async function detallesLiga(id) {
  const ligaFetch = await fetch("https://www.thesportsdb.com/api/v1/json/123/lookupleague.php?id=" + id)
  const data = await ligaFetch.json();
  if (!ligaFetch.ok) {
    alert("Error " + ligaFetch.status);
  }
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
          <h3>Videos de hasta hace 4 dias</h3><small>(pueden no cargar, la API no te da lista es uno por uno y su ratelimiting es molesto) Aparecen con delay, se fetchean dia por dia.<br>Es posible que no carguen bien los embeds y tengas que usar "Ver en Youtube", pero los IDS son correctos y tocar ese boton te envia a la pagina de youtube a ver el video correcto. Supuestamente los embeds no cargan por el copyright de los highlights.</small>
        </div>    `;
  for (const dia of [0, 24, 48, 72, 96]) {
    let fecha = new Date();
    fecha.setHours(fecha.getHours() - dia);
    const string = fecha.toISOString().slice(0, 10);
    await delay(1000);
    const highlightsFetch = await fetch("https://www.thesportsdb.com/api/v1/json/123/eventshighlights.php?d=" + string + "&l=" + liga.idLeague);
    const highlights = await highlightsFetch.json();
    if (!highlightsFetch.ok) {
      alert("Error " + highlightsFetch.status);

    }
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
      } else {
        const diasPasados = dia / 24;
        if (diasPasados > 0){
        detalles.insertAdjacentHTML('beforeend', `<p>Ningun video hace ${diasPasados} dias.</p>`);
        } else {
          detalles.insertAdjacentHTML('beforeend', `<p>Ningun video hoy.</p>`);
        }
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