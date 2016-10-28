import { Component, ChangeDetectorRef } from '@angular/core';
import { ComponentService } from './app.componentservice'


@Component({
    selector: 'my-app',
    providers: [ComponentService],
    template: `
    <h1>{{title}}</h1>
    <p>Status: Added objects: {{componentService.getNumber()}}</p>
    <button (click)="componentService.clicked()">ClickMe</button>
    <span>Loading data took {{componentService.getElapsedTime()}}ms</span>
    `
})

export class AppComponent {
    constructor(public componentService: ComponentService, private ref: ChangeDetectorRef) {
        this.numSaved = componentService.getNumber();
    }
    
    title = 'IndexedDb peformance tests.';
    idsAdded = [];
    numSaved = 10;
}



let ids: any[] = [];