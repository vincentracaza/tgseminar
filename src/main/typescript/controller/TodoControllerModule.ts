/**
 * Created by User-Hp002 on 6/13/13.
 */

///<reference path='../libs/DefinitelyTyped/angularjs/angular.d.ts' />

///<reference path='../Model.ts' />


module Todo {
    export interface Scope extends ng.IScope {
        todos:Model.Todo[];

        add:()=>void;
        newContent:string;
    }

    export class Controller {
        constructor(public $scope:Scope) {
            this.$scope.todos = [
                new Model.Todo("Hello my todo."),
                new Model.Todo("Hello my todo2.")
            ];

            this.$scope.add = () => this.add();
        }

        add():void {
            var content = this.$scope.newContent;
            var todo = new Model.Todo(content);
            this.$scope.todos.push(todo);
        }
    }
}