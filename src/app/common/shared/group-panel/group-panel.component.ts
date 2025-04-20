import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-group-panel',
    templateUrl: './group-panel.component.html',
    styleUrls: ['./group-panel.component.css'],
    standalone: true
})
export class GroupPanelComponent implements OnInit {

  @Input() title: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
