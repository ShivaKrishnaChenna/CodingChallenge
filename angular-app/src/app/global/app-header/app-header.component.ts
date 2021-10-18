import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.scss']
})
export class AppHeaderComponent {

  public canShowNavBar: boolean = true;
  public showMenuIcon: boolean = true;

  constructor() {
  }

  //#endregion constructor

  //#region component events

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
