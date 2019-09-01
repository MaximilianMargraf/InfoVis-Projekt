var gender 	= 	null;
var year	=	null;
var autoplay = null;

function initiliazeMap(){
	colorMap(year);
	$('span.year span').html(year);
}

function calculateColor (bmi) {

	var red = 0;
	var green = 255;
	bmi = bmi - 16;

	var tmp = Math.round(255/17 * bmi);
	red = red + tmp;
	green = green - tmp;

	var color = 'rgb('+ red + ',' + green + ',0)';
	return color;
}

function createWorldMap(){
	d3.xml("images/world1.svg").mimeType("image/svg+xml").get(function(error, xml) {
	   if (error) throw error;
	   d3.select(".svgworld").node().appendChild(xml.documentElement);
	});
}

function colorMap(year) {
	$.ajax({
		url		: 	'/include/function.php',
		data	: 	{
			gender		: 	gender,
			year 		:   year 
		},
		type: "POST",
		dataType: 'json',
		cache: false,
		success	: 	function ( result ) {
			var color = '';
			for(var i = 0; i < result.length; i++) {
				$('#'+result[i]['ISO']+'').css('fill',calculateColor(result[i]['Mean BMI']));
			}
		}	
	});
}

$(document).ready(function() {

	gender 	= 	'Men';
	year	=	1975;
	autoplay = null;

	createWorldMap();
	initiliazeMap();

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

    $(".slidecontainer input.slider" ).on("change", function() {
    	colorMap($(this).val());
    	year = $(this).val();
    	$('span.year span').html(year);
	});
});

function moveSlider() {
	var slider = $(".slidecontainer input.slider");
	var currValue = parseInt(slider.val());
	var nextValue = currValue + 1;
	slider.val(nextValue);
    colorMap(slider.val());
	year = slider.val();
	$('span.year span').html(year);
}

