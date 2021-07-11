<img src="snips/1-Logo.png" alt="Logo" width="200" height="120" align="right">

Using the Earthquake dataset provided from <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson">USGS </a>, the data comes in the form of geojson and is then presented to the HTML file via Javascript using D3.json() <br>
The dataset includes data such as magnitude of the quakes, time it happened, longitude, latitude. 
Theres are required to plot the circles on the map.
<hr>

<img src="snips/geojsondata.JPG" alt="geodata" width="540" height="510">

The second set of data contains <a href="https://github.com/fraxen/tectonicplates">tectonic plates coordinates</a> which are in JSON format.  
The map is initialised using map provided by <a href="https://www.mapbox.com/">MapBox</a>.
Two main maps are selected for this project - Street and Satellite view. <br>
A conditional for the color code to differentiate the magnitudes of each quakes that are happening 

<img src="snips/colorcode.JPG" alt="Color Code function"  width="450" height="430"> 

<br>
The following is the snippet of code to create circles for the quakes and appending them onto the map
<img src="snips/quakes.JPG" alt="Quakes Data" width="650" height="530"> 

As for the tectonic data, lines are being plotted on the map.

<img src="snips/tectonic.JPG" alt="Tectonic Data" width="450" height="430"> 

The base and overlay Maps are then set for the Layer Controls. 

As for the legend on the bottom right, the grades list contains the magnitude whereas the color refers back to the colorcode function earlier to obtain the colors. 

<img src="snips/legend.JPG" alt="legend" width="595" height="373"> 

The following is a preview of how the Leaflet Plot works:

<img src="snips/leafletdemo.gif" alt="demo" width="960" height="560">

Users are able to interact with the map by selecting the toggle in order to show the map layer required<br>

A config.js file is required in the Static/js folder with API_KEY from <a href="https://www.mapbox.com/">MapBox</a> in order for the map to work.
