'use strict';
var Service;
(function (Service) {
    var SampleService = (function () {
        function SampleService($http) {
            this.$http = $http;
        }
        SampleService.prototype.test = function () {
            return this.$http.get("");
        };
        return SampleService;
    })();
    Service.SampleService = SampleService;    
})(Service || (Service = {}));
