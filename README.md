# InfoVis-Projekt
The purpose of this project is to
1. Show the correlation between an increasing BMI over the years and the diabetis prevelance -> InfoVis.html
2. Show how the mean BMI differs from countries all around the globe throughout the years -> choroplethmap.html

All data has been taken from http://www.ncdrisc.org/index.html

The InfoVis.html contains the 1. part of this project. It can opened in the browser.
The index.html contains the second part of the project. To open it start an apache server with xampp,
move this repository to htdocs and connect to it with http://127.0.0.1/

One can zoom into the graph in InfoVis.html by pressing their mouse on the graph and then draggin it, zooming into a specific time frame.
Panning can be done after zooming in and then selecting the "pan" option. To reset, press the "reset" button next to the pan button.
By pressing the name of the country in the legend, graphs can be hidden to provide a better overview over the remaining graphs.
For some reason certain countries do not load correctly. To work around this, just click the female button and then all
countries will load correctly even if turned back on male. This might be an issue with the paths of the SVG.
These Charts were done with Canvas.JS.

The Chloropleth map of the world shows the BMI of men and women around the globe. The male and female dataset can be selected by pressing
the respective buttons. A click on the "play" button will start a quick rush through the years to demonstrate how the BMI changed over
the years.
For the white countries no data was provided.
The map has been created using d3.