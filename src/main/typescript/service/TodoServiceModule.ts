///<reference path='../libs/DefinitelyTyped/angularjs/angular.d.ts' />

///<reference path='../Model.ts' />

'use strict';

module Service {

    export class TodoService {

        constructor(public $http:ng.IHttpService) {
        }

        getList():ng.IHttpPromise {
            var promise = this.$http.get("/list");
            var wrapped:ng.IHttpPromise = {
                success: (callback) => {
                    promise.success((data, status, headers, config) => {
                        var resultList:Model.Todo[] = [];
                        data.forEach((data)=> {
                            resultList.push(new Model.Todo(data));
                        });
                        callback(resultList, status, headers, config);
                    });
                },
                error: promise.error,
                then: promise.then
            };
            return wrapped;
        }

        delete(id:number):ng.IHttpPromise {
            var promise = this.$http.get("/delete?id="+id);
            var wrapped:ng.IHttpPromise = {
                success: (callback) => {
                    promise.success((data, status, headers, config) => {
//                        var resultList:Model.Todo[] = [];
//                        data.forEach((data)=> {
//                            resultList.push(new Model.Todo(data));
//                        });
                        callback(null, status, headers, config);
                    });
                },
                error: promise.error,
                then: promise.then
            };
            return wrapped;
        }

        edit(id:number, title:string):ng.IHttpPromise {
            var promise = this.$http.get("/update?id="+id+"&title="+title);
            var wrapped:ng.IHttpPromise = {
                success: (callback) => {
                    promise.success((data, status, headers, config) => {
//                        var resultList:Model.Todo[] = [];
//                        data.forEach((data)=> {
//                            resultList.push(new Model.Todo(data));
//                        });
                        callback(null, status, headers, config);
                    });
                },
                error: promise.error,
                then: promise.then
            };
            return wrapped;
        }

        add(title:string):ng.IHttpPromise {
            var promise = this.$http.get("/post?title="+title);
            var wrapped:ng.IHttpPromise = {
                success: (callback) => {
                    promise.success((data, status, headers, config) => {
//                        var resultList:Model.Todo[] = [];
//                        data.forEach((data)=> {
//                            resultList.push(new Model.Todo(data));
//                        });
                        callback(null, status, headers, config);
                    });
                },
                error: promise.error,
                then: promise.then
            };
            return wrapped;
        }
    }
}
