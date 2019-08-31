// path to data
var data = "countries_BMI.json";

// save bmi with country as key for each year
var bmi = [];
// names of countries
var names = {};

function initiliazeMap(year, value){
	var Year = "";
	activeYear = year;

	// change value of visualization
	activeValue = value;

	createWorldMap();
}

function createWorldMap(){
	/*
	var path = d3.geoPath();

	// display map as svg
	var svg = d3.select("svg");

	// needed to apply gradients
	var def = svg.append("def");

	// gray rectangle to gradient scale legend
	var legend = svg.append("g")
		.attr("class", "legendGrey")
		.attr("transform", "translate(" + 300 + "," + 650 + ")");

  // color legend in svg-format
	var legendGradient = svg.append("g")
		.attr("class", "legendWrapper")
		.attr("transform", "translate(" + 450 + "," + 650 + ")");

  // create infobox for further information
	var div = d3.select("body").append("div")
		.attr("class", "infobox")
		.style("opacity", 0);
	*/
	d3.json("countries_BMI.json").then(function(data) {
  		console.log(data[0]);
	});
}