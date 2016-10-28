import { Injectable } from '@angular/core';

import db = require("dbjs");

@Injectable()

export class ComponentService {
    private n = 0;

    private server: any;
    private ids: obj[] = [];
    private elapsedMs;

    constructor() {
        this.openConnection();
    }

    public getNumber(): number {
        return this.n;
    }

    public clicked() {
        console.time("loadObjects");
        let t0 = performance.now();
        for (let i = 0; i < 1000; i++) {
            let obj = this.getUniqueObject();
            this.ids.push(obj);
            this.server.testdata.update(obj);
        }
        console.timeEnd("loadObjects");
        this.n = this.ids.length;
        let t1 = performance.now();
        this.elapsedMs = t1-t0;
    }

    public getElapsedTime() {
        return this.elapsedMs;
    }

    private openConnection = (): Promise<boolean> => {
        let self = this;
        return db.open({
            server: 'my-app',
            version: 1,
            schema: {
                testdata: {
                    key: { keyPath: 'id' },
                }
            }
        }).then(function (s) {
            self.server = s;
            console.log("Opened db connection.");
            return true;
        });
    }
    private createGUID(): string {
        // improvement: Is there a better way to generate guids? This is from: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    private getUniqueObject(): obj {
        let ticks: { [tick: number]: number } = {}
        for (let i = 0; i < 96; i++) {
            ticks[i] = Math.random() * 1000;
        }

        return {
            id: this.createGUID(),
            values: ticks
        }
    }
}

type obj = { id: string, values: { [tick: number]: number } };