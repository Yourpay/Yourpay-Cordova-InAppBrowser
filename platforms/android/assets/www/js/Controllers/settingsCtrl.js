angular.module('PosApp').controller('settingsCtrl',['$scope', '$translate', 'payFactory', function($scope, $translate, payFactory) {
        $scope.title='img/Settings.png';
        $scope.chooseCurrency = function(c){
            payFactory.changeCurrency(c);
        };
        $scope.chooseDebug = function(c){
            localStorage.setItem("debug", c);
        };
        $scope.changeLanguage = function (val) {
            $translate.use(val);
        };
    }]);