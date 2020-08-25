
var myMap = L.map("map", {
    center: [10,-40],
    zoom: 3
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);
  
d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson', data =>{
    console.log(data.features);
    
    data.features.forEach(obj => {
        var lat = obj.geometry.coordinates[1];
        var lng = obj.geometry.coordinates[0];
        var mag = obj.properties.mag;
        var location = obj.properties.place;

        L.circle([lat,lng], {
            color: "black",
            fillColor: getColor(mag),
            fillOpacity: 0.75,
            radius: mag*50000
          }).bindPopup(`<h3>${location}</h3><h3>Magnitude: ${mag}</h3>`).addTo(myMap);
    });
    function getColor(mag) {
        switch (true) {
            case mag>5:
                return 'red';        
            case mag>4:
                return 'purple';        
            case mag>3:
                return 'green';        
            case mag>2:
                return 'yellow';        
            case mag>1:
                return 'white';        
            default:
                return "black"
        }
    }
});

var legend = L.control({ position: "bottomleft" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");

  // Add min & max
  var legendInfo = 
            `<i style="background-color:white">1</i> 
             <i style="background-color:yellow">2</i> 
             <i style="background-color:green">3</i> 
             <i style="background-color:purple">4</i> 
             <i style="background-color:red">5+</i> 
            `
  div.innerHTML = legendInfo;
  return div;
};

// Adding legend to the map
legend.addTo(myMap);