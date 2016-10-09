'use strict';
app.controller("weather", function($scope, $http) {
    $scope.weatherData = {"success": false};
    $scope.showForm = false;
    $scope.apiKey= "3b22be974ef93fa0e736577d618a681c";
    $scope.locationInfo = "zip=" + $scope.zip;
    $scope.unit = "metric";
    $scope.tempUnit = "°C";
    $scope.apiUrl = "http://api.openweathermap.org/data/2.5/weather?";
    $scope.backgroundImage = "url(images/default.jpg)";
    $scope.loading = "";

    $scope.setBackground = function(icon) {
    	if(typeof icon=="undefined") {
    		$scope.backgroundImage = "url(images/default.jpg)";
    	} else {
    		$scope.backgroundImage = "url(images/" + icon + ".gif)";
    	}
    }

    $scope.getWeatherUrl = function() {
    	return $scope.apiUrl + $scope.locationInfo + "&units=" + $scope.unit + "&APPID=" + $scope.apiKey;
    }

    $scope.init = function() {
		$scope.getLocation();    	
    }

    $scope.getLocation = function() {
		if (navigator.geolocation) {
			$scope.loading = "Loading weather data...";
			navigator.geolocation.getCurrentPosition($scope.setPosition, $scope.handleError);
		} else { 
			// Geolocation not supported by browser
			$scope.handleError();
		}
	}

	$scope.setPosition = function(position) {
		$scope.locationInfo = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude
		$scope.getWeather();
	}

	/* Common error handler */
	$scope.handleError = function(error) {
		//alert("An unexpected error have occured. Please try with a valid Zip code.");
		$scope.weatherData = {"success": false};
       	$scope.showForm = true;
       	$scope.loading = "";
		if(error=="true") {
			alert("Type a valid zip code");
		} else {
			$scope.$apply();
		}
	}

    $scope.getWeather = function() {
    	$http.get($scope.getWeatherUrl()).then(function(response) {
    		if(response.data.cod == "200") {
    			// Location is found and successfull retrieval of weather data 
    			$scope.weatherData = {
    				"success": true,
    				"data": {
			    		"updatedTime": $scope.getReadableTime(response.data.dt),
			    		"locationName": response.data.name,
			    		"humidity": response.data.main.humidity,
			    		"pressure": response.data.main.pressure,
			    		"temp": response.data.main.temp,
			    		"max": response.data.main.temp_max,
			    		"min": response.data.main.temp_min,
			    		"condition": response.data.weather[0].description
		    		}
	    		}
	    		$scope.showForm = false;
	    		$scope.setBackground(response.data.weather[0].icon);
	    		$scope.loading = "";
	    		if($scope.unit == "imperial") {
		    		$scope.tempUnit = "°F";		
		    	} else {
		    		$scope.tempUnit = "°C";		
		    	}
    		} else {
    			// Handle API error
    			$scope.handleError();
    		}
    	}, function(response) {
    		// Handle ajax error
			$scope.handleError("true");
		});
    }

    $scope.getReadableTime = function(ts) {
    	var date = new Date(ts*1000);
    	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    	return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " hrs";
    }

    $scope.formSubmitHandler = function() {
    	$scope.locationInfo = "zip=" + $scope.zip;
    	$scope.getWeather();
    }

    $scope.toggleForm = function() {
    	$scope.showForm = true;
    	$scope.weatherData = {"success": false};
    	$scope.setBackground();
    }

    $scope.toggleUnit = function() {
    	if($scope.unit == "metric") {
    		$scope.unit = "imperial";		
    	} else {
    		$scope.unit = "metric";
    	}
    	$scope.getWeather();
    }
});