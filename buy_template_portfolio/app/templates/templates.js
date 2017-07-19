angular.module('templateStore.templates', ['ngRoute'])

// going to chain things together
.config(['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/templates', {
        templateUrl: 'templates/templates.html',
        controller: 'TemplatesCtrl'
    }).
    when('/templates/:templateId', {
        templateUrl: 'templates/template-details.html',
        controller: 'TemplateDetailsCtrl'
    })
}])

.controller('TemplatesCtrl', ['$scope', '$http', function($scope, $http){    
    console.log("template controller init");
    $http.get('json/templates.json').success(function(data){
        $scope.templates = data;
        console.log(data);
    })
}])

.controller('TemplateDetailsCtrl', ['$scope', '$http', '$routeParams', '$filter', function($scope, $http, $routeParams, $filter){    
    console.log("template details controller init");
    var templateId = $routeParams.templateId;
    console.log(templateId);
    $http.get('json/templates.json').success(function(data){
        //$scope.templateDetails = data;    // you need this so that the views in angular can access the data ($scope variable is key)
        $scope.templateDetails = $filter('filter')(data, function(d){
            console.log(d);
            console.log(d.image);
            return d.id == templateId;
        })[0]; // look at thius
        //$scope.mainImage = $scope.templateDetails.image;
    });
}])