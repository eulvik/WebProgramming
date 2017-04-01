import { Component, ChangeDetectorRef } from '@angular/core';
import { ComponentService } from './app.componentservice'

@Component({
    selector: 'my-app',
    providers: [ComponentService],
    template: `
    <h1>{{title}}</h1>
    <table>
    <tr>
        <td><button (click)="componentService.runScenarioAdd1KRetrive()">Run Scenario 1K</button></td>
        <td><button (click)="componentService.runScenarioAdd10KRetrive()">Run Scenario 10K</button></td>
        <td><button (click)="componentService.runScenarioAdd20KRetrive()">Run Scenario 20K</button></td>
        <td><button (click)="componentService.runScenarioAdd30KRetrive()">Run Scenario 30K</button></td>
        <td><button (click)="componentService.runScenarioAdd40KRetrive()">Run Scenario 40K</button></td>
        <td><button (click)="componentService.runScenarioAdd50KRetrive()">Run Scenario 50K</button></td>
    </tr>
    </table>
    <br />
    <div *ngFor='let message of componentService.messages'>
        {{message}}
    </div>
    `
})

export class AppComponent {
    constructor(public componentService: ComponentService, private ref: ChangeDetectorRef) {
    }
    
    title = 'IndexedDb peformance tests.';
    idsAdded = [];
}



let ids: any[] = [];