var gender 	= 	null;
var year	=	null;
var autoplay = null;

function initiliazeMap(){
	colorMap(year);
	$('span.year span').html(year);
}

// The "transfer" function
function calculateColor (bmi) {
	var red = 0;
	var green = 255;
	bmi = bmi - 16;

	// this way we move from 0,255,0 to 255,0,0 gradually
	var tmp = Math.round(255/18 * bmi);
	red = red + tmp;
	green = green - tmp;

	var color = 'rgb('+ red + ',' + green + ',0)';
	return color;
}

// append svg of world with paths and everything to node element
function createWorldMap(){
	d3.xml("images/world1.svg").mimeType("image/svg+xml").get(function(error, xml) {
	   if (error) throw error;
	   d3.select(".svgworld").node().appendChild(xml.documentElement);
	});
}

// color the map  according to the year
function colorMap(year) {
	$.ajax({
		url		: 	'/include/function.php',
		data	: 	{
			action		: 	'getListByGenderAndYear', 
			gender		: 	gender,
			year 		:   year 
		},
		type: "POST",
		dataType: 'json',
		cache: false,
		success	: 	function ( result ) {
			var color = '';
			for(var i = 0; i < result.length; i++) {
				$('#'+result[i]['ISO']+'').css('fill',calculateColor(result[i]['Mean_BMI']));
			}
		}	
	});
}

// call function that gives us the information of the country we hover over
function getHoverInfo (iso) {
	$.ajax({
		url		: 	'/include/function.php',
		data	: 	{
			action		: 	'getListByCountryAndYear', 
			iso		: 	iso,
			year 		:   year 
		},
		type: "POST",
		dataType: 'json',
		cache: false,
		success	: 	function ( result ) {
			$('#hoverInfo').html(buildHoverInfo(result));
		}	
	});
}

// Build string on hover
function buildHoverInfo (data) {
	var html = '';
	var index = null;

	for(var i = 0; i < data.length; i++) {
		switch(i) {
			case 0:
				index = 'Country';
				break;
			case 1:
				index = 'BMI - Men';
				break;
			case 2:
				index = 'BMI - Women';
				break;
		}
		html = html + '<p>' + index + ': ' + data[i] + '</p>'
	}
	return html;
}

// initialize everything on ready
$(document).ready(function() {

	gender 	= 	'Men';
	year	=	1975;
	autoplay = null;

	createWorldMap();
	initiliazeMap();

	// change sexes
	$('#male.button').click(function() {
	  if (!$(this).hasClass('active')) {
	  	$(this).addClass('active');
	  	$('#female.button').removeClass('active');
	  	gender = 'Men';
	  	colorMap(year);
	  }
	  else {
	  	$('#female.button').removeClass('active');
	  }
	});

	$('#female.button').click(function() {
	  if (!$(this).hasClass('active')) {
	  	$(this).addClass('active');
	  	$('#male.button').removeClass('active');
	  	gender = 'Women';
	  	colorMap(year);
	  }
	  else {
	  	$('#male.button').removeClass('active');
	  }
	});

	// implement play button
	$('#play.button').click(function() {
	  if (!$(this).hasClass('active')) {
	  	$(this).addClass('active');
	  	$('#stop.button').removeClass('active');
	  	autoplay = setInterval("moveSlider()", 100);
	  }
	  else {
	  	$('#stop.button').removeClass('active');
	  }
	});

	$('#stop.button').click(function() {
	  if (!$(this).hasClass('active')) {
	  	$(this).addClass('active');
	  	$('#play.button').removeClass('active');
	  	clearInterval(autoplay);
	  }
	  else {
	  	$('#play.button').removeClass('active');
	  }
	});

	// change year with moving the slider
    $(".slidecontainer input.slider" ).on("change", function() {
    	colorMap($(this).val());
    	year = $(this).val();
    	$('span.year span').html(year);
	});
});

// used for the play button that will move the slider
function moveSlider() {
	var slider = $(".slidecontainer input.slider");
	var currValue = parseInt(slider.val());
	// increase year by 1
	var nextValue = currValue + 1;
	slider.val(nextValue);
    colorMap(slider.val());
    //adjust year in the header
	year = slider.val();
	$('span.year span').html(year);
}