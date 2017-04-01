import { Injectable } from '@angular/core';

import db = require("dbjs");

@Injectable()

export class ComponentService {
    private n = 0;

    private server: any;
    public messages: string[] = [];

    constructor() {
        this.openConnection();
    }

    public runScenarioAdd1KRetrive() {
        this.messages.push("Start Scenario runScenarioAdd1KRetrive");
        this.clearDatabase();
        this.addObjects(1000).then(ids => {
            this.timeFetch(1000, ids);
        })
    }

    public runScenarioAdd10KRetrive() {
        this.messages.push("Start Scenario runScenarioAdd10KRetrive");
        this.clearDatabase();
        this.addObjects(10000).then(ids => {
            this.timeFetch(1000, ids);
        })
    }


    public runScenarioAdd20KRetrive() {
        this.messages.push("Start Scenario runScenarioAdd20KRetrive");
        this.clearDatabase();
        this.addObjects(20000).then(ids => {
            this.timeFetch(1000, ids);
        })
    }

    public runScenarioAdd30KRetrive() {
        this.messages.push("Start Scenario runScenarioAdd30KRetrive");
        this.clearDatabase();
        this.addObjects(30000).then(ids => {
            this.timeFetch(1000, ids);
        })
    }

    public runScenarioAdd40KRetrive() {
        this.messages.push("Start Scenario runScenarioAdd40KRetrive");
        this.clearDatabase();
        this.addObjects(40000).then(ids => {
            this.timeFetch(1000, ids);
        })
    }

    public runScenarioAdd50KRetrive() {
        this.messages.push("Start Scenario runScenarioAdd50KRetrive");
        this.clearDatabase();
        this.addObjects(50000).then(ids => {
            this.timeFetch(1000, ids);
        })
    }



    private timeFetch(numFetches: number, ids: string[]) {
        let maxIdx = ids.length - 1;
        let indicesToFetch: number[] = [];
        this.messages.push("Creating indices to fetch.")
        for (let i = 0; i < numFetches; i++) {
            indicesToFetch.push(Math.round(Math.random() * maxIdx));
        }

        let measurements: number[] = [];
        let promises: Promise<number>[] = [];
        for (let i = 0; i < indicesToFetch.length; i++) {
            let id = ids[indicesToFetch[i]];
            promises.push(this.fetchSingleObject(id).then(measurement => measurements.push(measurement)));
        }

        Promise.all(promises).then(() => {
            let sum = 0;
            measurements.forEach((v) => {
                sum += v;
            });
            let averageFetchTime = sum / indicesToFetch.length;
            this.messages.push(`Fetched ${indicesToFetch.length} times. Average fetch time was ${averageFetchTime}ms`);
        })
    }

    private fetchSingleObject(id: string): Promise<number> {
        let t0 = performance.now();
        return this.server.data.get(id).then((result) => {
            if (result === undefined) {
                this.messages.push(`Object for id=${id} was undefined.`);

            } else {
                let t1 = performance.now();
                return t1 - t0;
            }
        })
    }

    private measureIndexedDbSize() {
        let usedMb = 0;
        let grantedMb = 0;
        let self = this;
        (<any>navigator).webkitTemporaryStorage.queryUsageAndQuota(
            (usedBytes, grantedBytes) => {
                self.messages.push(`IndexedDb usage ${Math.round((usedBytes / 1024) / 1024)}MB / ${Math.round((grantedBytes / 1024) / 1024)}MB`)
            },
            (e) => { this.messages.push('Unable to read quota information'); }
        );
    }

    private addObjects(numObjects: number): Promise<string[]> {
        this.messages.push(`Adding ${numObjects} objects`);
        let ids: string[] = [];
        let t0 = performance.now();
        let promises: Promise<any>[] = [];

        for (let i = 0; i < numObjects; i++) {
            let obj = this.getUniqueObject();
            ids.push(obj.id);
            promises.push(this.server.data.update(obj));
        }
        
        return Promise.all(promises).then(() => {
            let t1 = performance.now();
            this.messages.push(`Adding ${numObjects} took ${t1 - t0}ms.`)
            return ids;
        });
    }

    public clearDatabase() {
        this.messages.push("Clearing database.");
        this.server.data.clear();
    }

    private openConnection = (): Promise<boolean> => {
        let self = this;
        return db.open({
            server: 'my-app',
            version: 1,
            schema: {
                data: {
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