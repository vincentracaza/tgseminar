var Model;
(function (Model) {
    var Sample = (function () {
        function Sample(data) {
            if(angular.isString(data)) {
                data = angular.fromJson(data);
            }
            this.test = data.test;
        }
        return Sample;
    })();
    Model.Sample = Sample;    
    var Todo = (function () {
        function Todo(content) {
            if (typeof content === "undefined") { content = "Unknown"; }
            this.content = content;
        }
        return Todo;
    })();
    Model.Todo = Todo;    
})(Model || (Model = {}));
'use strict';
describe("Modelの", function () {
});
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
var Todo;
(function (Todo) {
    var Controller = (function () {
        function Controller($scope) {
            this.$scope = $scope;
            var _this = this;
            this.$scope.todos = [
                new Model.Todo("Hello my todo.")
            ];
            this.$scope.add = function () {
                return _this.add();
            };
            this.$scope.remove = function (index) {
                return _this.remove(index);
            };
            this.$scope.modify = function (index, modifiedValue) {
                return _this.modify(index, modifiedValue);
            };
        }
        Controller.prototype.add = function () {
            var content = this.$scope.newContent;
            var todo = new Model.Todo(content);
            this.$scope.todos.push(todo);
        };
        Controller.prototype.remove = function (index) {
            this.$scope.todos.splice(index, 1);
        };
        Controller.prototype.modify = function (index, modifiedValue) {
            this.$scope.todos[index] = new Model.Todo(modifiedValue);
        };
        return Controller;
    })();
    Todo.Controller = Controller;    
})(Todo || (Todo = {}));
'use strict';
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
'use strict';
describe("Serviceの", function () {
    var $injector;
    beforeEach(function () {
        $injector = angular.injector([
            'ngMock', 
            'gae-standards.service'
        ]);
    });
    describe("Service.SampleServiceの", function () {
        var $httpBackend;
        var service;
        beforeEach(function () {
            $httpBackend = $injector.get("$httpBackend");
            service = $injector.instantiate(Service.SampleService, {
            });
        });
        it("testメソッドのテスト", function () {
            $httpBackend.expect("GET", null).respond(200, {
            });
            var promise = service.test();
            var model;
            promise.success(function (data) {
                return model = data;
            });
            $httpBackend.flush();
            expect(model).toBeDefined();
        });
    });
});
(function (global) {
})(window);
'use strict';
describe("Controllerの", function () {
    var $injector;
    beforeEach(function () {
        $injector = angular.injector([
            'ngMock', 
            'gae-standards.service'
        ]);
    });
    describe("Sample.TestControllerの", function () {
        var $scope;
        var $controller;
        var $httpBackend;
        beforeEach(function () {
            $httpBackend = $injector.get("$httpBackend");
            $controller = $injector.get("$controller");
            $scope = $injector.get("$rootScope").$new();
        });
        it("Controllerの作成", function () {
            var controller = $controller(Sample.TestController, {
                $scope: $scope,
                $routeParams: {
                    domain: "topgate.co.jp"
                }
            });
            expect($scope.name).toBe("サーバと通信中");
            expect($scope.temp).toBe("仮");
        });
    });
});
'use strict';
describe("Controllerの", function () {
    var $injector;
    beforeEach(function () {
        $injector = angular.injector([
            'ngMock', 
            'gae-standards.service'
        ]);
    });
    describe("Todo.Controllerの", function () {
        var $scope;
        var $controller;
        var $httpBackend;
        beforeEach(function () {
            $httpBackend = $injector.get("$httpBackend");
            $controller = $injector.get("$controller");
            $scope = $injector.get("$rootScope").$new();
        });
        it("Controllerの作成", function () {
            var controller = $controller(Todo.Controller, {
                $scope: $scope
            });
            expect($scope.todos.length).toBe(1);
            $scope.newContent = "NewContent1";
            controller.add();
            expect($scope.todos.length).toBe(2);
            expect($scope.todos[1]).toEqual({
                content: "NewContent1"
            });
            controller.remove(1);
            expect($scope.todos.length).toBe(1);
            $scope.newContent = "NewContent2";
            controller.add();
            expect($scope.todos.length).toBe(2);
            expect($scope.todos[1]).toEqual({
                content: "NewContent2"
            });
            $scope.newContent = "NewContent3";
            controller.add();
            expect($scope.todos.length).toBe(3);
            expect($scope.todos[2]).toEqual({
                content: "NewContent3"
            });
            controller.modify(1, "NewContent2_Edited");
            expect($scope.todos.length).toBe(3);
            expect($scope.todos[1]).toEqual({
                content: "NewContent2_Edited"
            });
        });
    });
});
