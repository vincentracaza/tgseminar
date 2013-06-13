'use strict';
var Module;
(function (Module) {
    angular.module("gae-standards", [
        "gae-standards.controller", 
        "gae-standards.service", 
        "gae-standards.filter", 
        "gae-standards.directive"
    ], function ($routeProvider, $locationProvider) {
        $routeProvider.when("/sample", {
            templateUrl: "/template/sample.html"
        }).otherwise({
            templateUrl: "/template/main.html"
        });
        $locationProvider.html5Mode(true);
    }).run(function ($rootScope, $routeParams) {
    });
    angular.module("gae-standards.service", [], function () {
    }).factory("sampleService", function ($http) {
        return new Service.SampleService($http);
    });
    angular.module("gae-standards.controller", [
        "gae-standards.service"
    ], function () {
    }).controller("SampleTestController", Sample.TestController);
    angular.module("gae-standards.directive", [], function () {
    }).controller("TodoController", Todo.Controller).directive("tgFileBind", function () {
        return function (scope, elm, attrs) {
            elm.bind("change", function (evt) {
                scope.$apply(function (scope) {
                    scope[attrs.name] = evt.target.files;
                });
            });
        };
    }).directive("tgContenteditable", function ($parse) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                var value = $parse(attrs.ngModel)(scope);
                elm.attr("contenteditable", "");
                var viewToModel = function () {
                    scope.$apply(function () {
                        ctrl.$setViewValue(elm.html());
                    });
                };
                elm.bind('blur', viewToModel);
                elm.bind('keyup', viewToModel);
                elm.bind('keydown', viewToModel);
                ctrl.$render = function () {
                    elm.html(ctrl.$viewValue);
                };
                if(value) {
                    ctrl.$setViewValue(value);
                    ctrl.$render();
                } else {
                    ctrl.$setViewValue(elm.html());
                }
            }
        };
    });
    angular.module("gae-standards.filter", [], function () {
    }).filter("rmDuplicated", function () {
        return function (input, options) {
            if(angular.isUndefined(input)) {
                return input;
            } else if(!angular.isArray(input)) {
                console.error("input is not array.", input);
                return input;
            }
            var excludeList;
            if(angular.isUndefined(options)) {
                console.error("options is required.");
                return input;
            } else if(angular.isArray(options)) {
                excludeList = options;
            } else if(angular.isArray(options.exclude)) {
                excludeList = options.exclude;
            }
            var compareFn = function (a, b) {
                return a.$key.keystr === b.$key.keystr;
            };
            if(angular.isUndefined(options)) {
            } else if(angular.isFunction(options.compare)) {
                compareFn = options.compare;
            }
            var result = [];
            input.forEach(function (data) {
                if(!excludeList.some(function (exclude) {
                    return compareFn(data, exclude);
                })) {
                    result.push(data);
                }
            });
            return result;
        };
    });
})(Module || (Module = {}));
