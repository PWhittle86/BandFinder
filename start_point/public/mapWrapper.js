const MapWrapper = function(element, lat, lng, zoom){
  const osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osm = new L.TileLayer(osmUrl);

  this.map = L.map(element, {worldCopyJump: true}).addLayer(osm).setView([lat, lng], zoom);
};

MapWrapper.prototype.addMarker = function(lat, lng, eventdetails) {
	L.marker([lat, lng], {opacity: 0.75}).bindPopup(eventdetails).addTo(this.map);
};
