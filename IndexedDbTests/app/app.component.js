"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var db = require("dbjs");
var Hero = (function () {
    function Hero() {
    }
    return Hero;
}());
exports.Hero = Hero;
var AppComponent = (function () {
    function AppComponent() {
        this.clicked = function () {
            var server;
            db.open({
                server: 'my-app',
                version: 1,
                schema: {
                    testdata: {
                        key: { keyPath: 'id' },
                    }
                }
            }).then(function (s) {
                server = s;
                for (var i = 0; i < 1000; i++) {
                    var obj = getUniqueObject();
                    ids.push(obj);
                    server.testdata.update(obj);
                }
            });
        };
        this.title = 'IndexedDb peformance tests.';
        this.idsAdded = [];
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <h1>{{title}}</h1>\n    <p>Status: Added objects: {{idsAdded.length}}</p>\n    <button (click)=\"clicked()\">ClickMe</button>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
function createGUID() {
    // improvement: Is there a better way to generate guids? This is from: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
exports.createGUID = createGUID;
function getUniqueObject() {
    var ticks = {};
    for (var i = 0; i < 96; i++) {
        ticks[i] = Math.random() * 1000;
    }
    return {
        id: createGUID(),
        values: ticks
    };
}
exports.getUniqueObject = getUniqueObject;
var ids = [];
//# sourceMappingURL=app.component.js.map