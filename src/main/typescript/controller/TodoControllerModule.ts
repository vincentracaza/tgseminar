/**
 * Created by User-Hp002 on 6/13/13.
 */

///<reference path='../libs/DefinitelyTyped/angularjs/angular.d.ts' />

///<reference path='../Model.ts' />


module Todo {
    export interface Scope extends ng.IScope {
        todos:Model.Todo[];

        add:()=>void;
        remove:(index)=>void;
        modify:(index, modifiedValue)=>void;
        newContent:string;
    }

    export class Controller {
        constructor(public $scope:Scope) {
            this.$scope.todos = [
                new Model.Todo("Hello my todo.")
            ];

            this.$scope.add = () => this.add();
            this.$scope.remove = (index) => this.remove(index);
            this.$scope.modify = (index, modifiedValue) => this.modify(index, modifiedValue);
        }

        add():void {
            var content = this.$scope.newContent;
            var todo = new Model.Todo(content);
            this.$scope.todos.push(todo);
        }

        remove(index):void {
            this.$scope.todos.splice(index, 1);
        }

        modify(index,modifiedValue):void {
            this.$scope.todos[index] = new Model.Todo(modifiedValue);
        }
    }
}