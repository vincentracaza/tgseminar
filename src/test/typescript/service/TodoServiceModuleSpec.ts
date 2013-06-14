///<reference path='../libs/DefinitelyTyped/jasmine/jasmine.d.ts' />

///<reference path='../../../main/typescript/libs/DefinitelyTyped/angularjs/angular.d.ts' />
///<reference path='../libs/DefinitelyTyped/angularjs/angular-mocks.d.ts' />

///<reference path='../../../main/typescript/service/TodoServiceModule.ts' />

'use strict';

describe("Serviceの", ()=> {
    var $injector:ng.auto.IInjectorService;
    beforeEach(()=> {
        $injector = angular.injector(['ngMock', 'gae-standards.service']);
    });

    describe("Service.SampleServiceの", ()=> {
        var $httpBackend:ng.IHttpBackendService;
        var service:Service.TodoService;

        beforeEach(()=> {
            $httpBackend = $injector.get("$httpBackend");

            service = $injector.instantiate(Service.TodoService, {
            });
        });

        it("getList", ()=> {
            $httpBackend.expect("GET", "/list").respond(200, [{title:"Test TODO"}]);
            var promise = service.getList();

            var model:Model.Todo;
            promise.success((data)=> model = data);

            $httpBackend.flush();

            expect(model).toBeDefined();
            expect(model.title).toBe("Test TODO");
            expect(model instanceof Model.Todo).toBeTruthy();

            // expect(model instanceof Model.Sample).toBeTruthy();
        });
    });
});
