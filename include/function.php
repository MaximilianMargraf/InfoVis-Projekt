<?php
	error_reporting(E_ALL);
	$action = $_POST['action'];
	switch ($action) {
		case 'getListByGenderAndYear':
			
			$jsonFile	=	file_get_contents('C:\xampp\htdocs\data\countries_BMI.json');
			$bmiValues 	= 	json_decode($jsonFile);
			$array = array();
			
			// go through all values
			foreach ($bmiValues as $bmiValue) {
				// add them to the array if the gender and year fit
				if ($bmiValue->Sex == $_POST['gender'] && $bmiValue->Year == $_POST['year']) {
					$array[] = $bmiValue;
				}
			}

			echo json_encode($array);
			break;
		
		case 'getListByCountryAndYear':
			$jsonFile	=	file_get_contents('C:\xampp\htdocs\data\countries_BMI.json');
			$bmiValues 	= 	json_decode($jsonFile);
			$array = array();
			$finalArray = array();
			
			// get the values of the correct country
			foreach ($bmiValues as $bmiValue) {
				if ($bmiValue->ISO == $_POST['iso'] && $bmiValue->Year == $_POST['year']) {
					$array[] = $bmiValue;
				}
			}

			// copy values from selected country
			$finalArray[] = $array[0]->Country;
			$finalArray[] = round($array[0]->Mean_BMI, 2); //male
			$finalArray[] = round($array[1]->Mean_BMI, 2); //female

			echo json_encode($finalArray);
			break;
	}
?>