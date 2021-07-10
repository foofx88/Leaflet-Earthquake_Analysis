var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });


// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
    center: [37.09, -95.71],
        zoom: 3,
        layers: [streetmap]
      });

function colorcode(quakes) {
    var color = "";
      if (quakes <= 1) {
        color = "rgb(251,255,70)"; 
        return color}
        else if (quakes <= 2) {
            color = "rgb(255,200,70)"; 
            return color}
            else if (quakes <= 3) {
                color = "rgb(255,153,70)";
                return color}
                else if (quakes <= 4) {
                    color = "rgb(255,70,70)"; 
                    return color}
                    else if (quakes <= 5) {
                        color = "rgb(223,0,0)"; 
                        return color}
                        else if (quakes >= 6) {
                            color = "rgb(121,0,0)"; 
                            return color}
        else {
            color = "rgb(251,255,70)"; }
    }

d3.json(queryUrl).then(function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    // console.log(data.features);
    var feature = data.features;
    feature.forEach(resp =>{
        magnitude = resp.properties.mag;
        geometry = resp.geometry;
        // console.log(geometry);
        // console.log(magnitude);
        if(geometry){
            circle_layer = L.circle([geometry.coordinates[1], geometry.coordinates[0]],{
                color: colorcode(magnitude),
                fillcolor: colorcode(magnitude),
                radius : magnitude * 15000

            }).addTo(myMap);
            
            circle_layer.bindPopup(`${resp.properties.title} <hr> 
            Occured On: ${new Date(resp.properties.time).toLocaleString()}`).addTo(myMap);

        }





    })

    });
