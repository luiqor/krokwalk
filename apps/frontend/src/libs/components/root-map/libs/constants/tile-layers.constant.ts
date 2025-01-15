import L from "leaflet";

const tileLayers = {
  Default: L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        'Tiles &copy; <a href="https://www.esri.com/">Esri</a>, Data from <a href="http://openstreetmap.org">OpenStreetMap</a> contributors and others',
    }
  ),
  Satellite: L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        'Tiles &copy; <a href="https://www.esri.com/">Esri</a>, Data from <a href="http://openstreetmap.org">OpenStreetMap</a> contributors and others',
    }
  ),
};

export { tileLayers };
