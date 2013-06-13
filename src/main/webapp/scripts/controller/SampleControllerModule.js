'use strict';
var Sample;
(function (Sample) {
    var TestController = (function () {
        function TestController($scope, sampleService) {
            this.$scope = $scope;
            this.sampleService = sampleService;
            $scope.name = "サーバと通信中";
            $scope.temp = "仮";
        }
        TestController.prototype.update = function () {
            this.sampleService.test();
        };
        return TestController;
    })();
    Sample.TestController = TestController;    
})(Sample || (Sample = {}));
