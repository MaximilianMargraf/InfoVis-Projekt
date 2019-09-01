<?php
	error_reporting(E_ALL);
	$jsonFile	=	file_get_contents('C:\xampp\htdocs\data\countries_BMI.json');
	$bmiValues 	= 	json_decode($jsonFile);
	
	$array = array();
	
	foreach ($bmiValues as $bmiValue) {

		if ($bmiValue->Sex == $_POST['gender'] && $bmiValue->Year == $_POST['year']) {
			$array[] = $bmiValue;
		}

	}

	echo json_encode($array);

?>