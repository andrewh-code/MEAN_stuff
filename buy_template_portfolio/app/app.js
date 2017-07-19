'use strict';

// Declare app level module which depends on views, and components
angular.module('templateStore', [
  'ngRoute',
  'templateStore.view1',
  'templateStore.view2',
  'templateStore.templates'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');   // need this to get rid of the #! hashbang reference

  $routeProvider.otherwise({redirectTo: '/templates'});
}]);
