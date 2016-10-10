'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('angularWeatherAppApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $scope.response: {
        "coord":{"lon":80.28,"lat":13.08},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],"base":"stations","main":{"temp":24.8,"pressure":1021.89,"humidity":100,"temp_min":24.8,"temp_max":24.8,"sea_level":1022.49,"grnd_level":1021.89},"wind":{"speed":5.22,"deg":284.001},"rain":{"3h":5.1225},"clouds":{"all":92},"dt":1476111914,"sys":{"message":0.008,"country":"IN","sunrise":1476059326,"sunset":1476102141},"id":1465730,"name":"Park Town","cod":200
      }
    });
  }));

  /*it('should attach a list of awesomeThings to the scope', function () {
    expect(MainCtrl.awesomeThings.length).toBe(3);
  });*/
});
