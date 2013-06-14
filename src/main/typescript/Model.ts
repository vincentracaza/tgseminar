///<reference path='libs/DefinitelyTyped/angularjs/angular.d.ts' />

/**
 * モデルのモジュール。
 */
module Model {
	export class Sample {
		test:string;

		/**
		 * @constructor
		 * @param data JSONObjectまたはJSON文字列
		 */
			constructor(data) {
			if (angular.isString(data)) {
				data = angular.fromJson(data);
			}
			this.test = data.test;
		}
	}

    export class Todo{
        id:number;
        title:string;
        createdAt:string;
        createdBy:string;

        constructor(data:any) {
            this.id = data.id;
            this.title = data.title;
            this.createdAt = data.createdAt;
            this.createdBy = data.createdBy;
        }
    }
}
