Usa la api de https://www.thesportsdb.com/free_sports_api aunque más tarde me di cuenta que sus rate limits pueden ser un poco restrictivos.

La API para la lista de deportes solo expone dos deportes si usas la API publica aunque tecnicamente hay muchos más disponibles asi que, mi uso de IA es:
Copiar y pegar de un row HTML en el explorador publico de la API que tenia en el sitio de TheSportsDB, que contenia todos los deportes con sus IDs, y pedirle a la IA que haga un array de objetos con el ID de deporte y el recurso de icono del deporte.
(ya que aunque la API no te lista los IDs de más de dos deportes si queres recibir la lista de deportes en la API publica, tranquilamente acepta buscar info de deportes que no estan incluidos ahi, mientrras le des el ID)

El selector es simple, clickea un deporte, luego si scrolleas abajo se cargan las ligas que expone la API de ese deporte, y selecciona una liga para ver detalles, con imagenes, e intentar cargar INDIVIDUALMENTE por cada dia un video de ese dia, porque la api publica NO te permite sacar highlights y videos entre dos fechas, debe ser dia por dia (y puede causar rate limits, intente agregar delay en vez de no incluir los hiighlights asi queda completo).
