//obtain url for geojson data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

//create streetmap map layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

// Create myMap to set the whole layout for the map
var myMap = L.map("map", {
    center: [37.09, -95.71],
        zoom: 3,
        layers: [streetmap]
      });

// can use the following logic to get color according to quake magnitudes
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
            color = "rgb(0,96,255)"; }
    }

//alternatively, this is much simplified 
    // function colorcode(quakes) {
    //     return quakes >= 6 ? 'rgb(121,0,0)' :
    //            quakes <= 5 ? 'rgb(223,0,0)' :
    //            quakes <= 4 ? 'rgb(255,70,70)' :
    //            quakes <= 3 ? 'rgb(255,153,70)' :
    //            quakes <= 2 ? 'rgb(255,200,70)' :
    //            quakes <= 1 ? 'rgb(251,255,70)' :
    //                       'rgb(0,96,255)';
    // }

d3.json(queryUrl).then(function(data) {
    // console.log(data.features); //to check data
    var feature = data.features;
    feature.forEach(resp =>{
        magnitude = resp.properties.mag;
        geometry = resp.geometry;
        // console.log(geometry); //to check
        // console.log(magnitude); //to check
        if(geometry){
            circle_layer = L.circle([geometry.coordinates[1], geometry.coordinates[0]],{
                color: colorcode(magnitude), //calling colorcode function to set color according to magnitude
                fillcolor: colorcode(magnitude),
                radius : magnitude * 15000

            }).addTo(myMap);
            
            circle_layer.bindPopup(`${resp.properties.title} <hr> 
            Occured On: ${new Date(resp.properties.time).toLocaleString()}`).addTo(myMap);

        }
    })
    });


    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        
        var div = L.DomUtil.create('div', 'legend'),
            grades = ["<= 1", "<= 2", "<= 3", "<= 4", "<= 5", ">= 6"],
            labels = ['<strong>Magnitude</strong>'];
    
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                labels.push('<i style="background:' + colorcode(i+1) + '"></i> ' +
                grades[i] );
        }
        div.innerHTML = labels.join('<br>');
        return div;
    };
    
    legend.addTo(myMap);