///<reference path='../libs/DefinitelyTyped/jasmine/jasmine.d.ts' />

///<reference path='../../../main/typescript/libs/DefinitelyTyped/angularjs/angular.d.ts' />
///<reference path='../libs/DefinitelyTyped/angularjs/angular-mocks.d.ts' />

///<reference path='../../../main/typescript/controller/TodoControllerModule.ts' />

    'use strict';

describe("Controllerの", ()=> {
    var $injector:ng.auto.IInjectorService;
    beforeEach(()=> {
        $injector = angular.injector(['ngMock', 'gae-standards.service']);
    });

    describe("Todo.Controllerの", ()=> {
        var $scope:Todo.Scope;
        var $controller:ng.IControllerService;
        var $httpBackend:ng.IHttpBackendService;

        beforeEach(()=> {
            $httpBackend = $injector.get("$httpBackend");
            $controller = $injector.get("$controller");

            $scope = <any> $injector.get("$rootScope").$new();
        });

        it("Controllerの作成", ()=> {
            var controller:Todo.Controller = $controller(Todo.Controller, {
                $scope: $scope
            });
            expect($scope.todos.length).toBe(1);

            // Add 1 new item in stack
            $scope.newContent = "NewContent1";
            controller.add();
            expect($scope.todos.length).toBe(2);
            expect($scope.todos[1]).toEqual({content:"NewContent1"});

            // Delete 1 item in stack
            controller.remove(1);
            expect($scope.todos.length).toBe(1);

            // Modify. Add 2 new items. then modify first item
            $scope.newContent = "NewContent2";
            controller.add();
            expect($scope.todos.length).toBe(2);
            expect($scope.todos[1]).toEqual({content:"NewContent2"});
            $scope.newContent = "NewContent3";
            controller.add();
            expect($scope.todos.length).toBe(3);
            expect($scope.todos[2]).toEqual({content:"NewContent3"});
            controller.modify(1, "NewContent2_Edited");
            expect($scope.todos.length).toBe(3);
            expect($scope.todos[1]).toEqual({content:"NewContent2_Edited"});
        });
    });
});