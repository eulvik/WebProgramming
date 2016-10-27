import { Component } from '@angular/core';
import db = require("dbjs");

export class Hero {
    id: number;
    name: string;
}
@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>
    <p>Status: Added objects: {{idsAdded.length}}</p>
    <button (click)="clicked()">ClickMe</button>
    `
})
export class AppComponent {
    clicked = () => {
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
            for (let i = 0; i < 1000; i++) {
                let obj = getUniqueObject();
                ids.push(obj);
                server.testdata.update(obj);
            }
        });
    };
    title = 'IndexedDb peformance tests.';
    idsAdded = [];
}

export function createGUID() {
    // improvement: Is there a better way to generate guids? This is from: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

export function getUniqueObject() {
    let ticks: { [tick: number]: number } = {}
    for (let i = 0; i < 96; i++) {
        ticks[i] = Math.random() * 1000;
    }

    return {
        id: createGUID(),
        values: ticks
    }
}

let ids: any[] = [];