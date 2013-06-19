'use strict';
var Service;
(function (Service) {
    var TodoService = (function () {
        function TodoService($http) {
            this.$http = $http;
        }
        TodoService.prototype.getList = function () {
            var promise = this.$http.get("/list");
            var wrapped = {
                success: function (callback) {
                    promise.success(function (data, status, headers, config) {
                        var resultList = [];
                        data.forEach(function (data) {
                            resultList.push(new Model.Todo(data));
                        });
                        callback(resultList, status, headers, config);
                    });
                },
                error: promise.error,
                then: promise.then
            };
            return wrapped;
        };
        TodoService.prototype.delete = function (id) {
            var promise = this.$http.get("/delete?id=" + id);
            var wrapped = {
                success: function (callback) {
                    promise.success(function (data, status, headers, config) {
                        callback(null, status, headers, config);
                    });
                },
                error: promise.error,
                then: promise.then
            };
            return wrapped;
        };
        TodoService.prototype.edit = function (id, title) {
            var promise = this.$http.get("/update?id=" + id + "&title=" + title);
            var wrapped = {
                success: function (callback) {
                    promise.success(function (data, status, headers, config) {
                        callback(null, status, headers, config);
                    });
                },
                error: promise.error,
                then: promise.then
            };
            return wrapped;
        };
        TodoService.prototype.add = function (title) {
            var promise = this.$http.get("/post?title=" + title);
            var wrapped = {
                success: function (callback) {
                    promise.success(function (data, status, headers, config) {
                        callback(null, status, headers, config);
                    });
                },
                error: promise.error,
                then: promise.then
            };
            return wrapped;
        };
        return TodoService;
    })();
    Service.TodoService = TodoService;    
})(Service || (Service = {}));
