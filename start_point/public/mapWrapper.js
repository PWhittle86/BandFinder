const MapWrapper = function(element, lat, lng, zoom){
  const osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osm = new L.TileLayer(osmUrl);

  this.map = L.map(element)
      .addLayer(osm)
      .setView([lat, lng], zoom);
};