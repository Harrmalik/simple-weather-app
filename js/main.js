var app2 = angular.module("weather-site", []);

app2.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app2.controller('MainController', ['$http', '$scope', function($http, $scope) {
    $scope.showing = false;
  	var weather = $scope;
  	var weatherKey = "2e7a5a530bee1dfaa57faff67c1bda35";
  	weather.forecast = {};
  	weather.region = {};

    $http.get("http://ip-api.com/json").success(function(data) {
        weather.region = data;
        $http.get( "http://api.openweathermap.org/data/2.5/forecast?q=" + data.city + ",us&mode=json&APPID=" + weatherKey).success(function( data ) {
            weather.forecast = data;
            weather.forecast.list[0].dt = moment.unix(data.list[0].dt).format('dddd MMM Do, h a');
            $scope.setBackground(data.list[0].weather[0].main);
        });
    });

    $scope.newLocation = function(town) {
      $http.get( "http://api.openweathermap.org/data/2.5/forecast?q=" + town + ",us&mode=json&APPID=" + weatherKey).success(function( data ) {
          weather.forecast = data;
          weather.forecast.list[0].dt = moment.unix(data.list[0].dt).format('dddd MMM Do, h a');
          $scope.setBackground(data.list[0].weather[0].main);
          console.log(data.list[0].weather[0].main);
      });
    };

    $scope.setBackground = function(type) {
        switch (type) {
            case 'Clear':
                document.body.style.backgroundImage = "url('imgs/clear.jpg')";
                break;

            case 'Rain':
                document.body.style.backgroundImage = "url('imgs/rain.jpg')";
                break;

            case 'Clouds':
                document.body.style.backgroundImage = "url('imgs/cloudy.jpg')";
                break;

            case 'Snow':
                document.body.style.backgroundImage = "url('imgs/snow.jpg')";
                break;

            default:
                document.body.style.backgroundImage = "url('imgs/rain.jpg')";
        }
    }

    $scope.toFahrenheit = function(temp) {
      var newTemp = Math.round((temp - 273.15)* 1.8000 + 32.00);
      return newTemp;
    };

    $scope.toCelsius = function(temp) {
      var newTemp = (temp - 32) * 5/9;
      return newTemp;
    };
}]);

$('#switchAddr').on('click', function(){
  $('.ui.basic.modal').modal('show');
});

$('#modalClose').on('click', function(){
  $('.ui.basic.modal').modal('hide');
});
