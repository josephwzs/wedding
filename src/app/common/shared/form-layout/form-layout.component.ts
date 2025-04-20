import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-form-layout',
    templateUrl: './form-layout.component.html',
    styleUrls: ['./form-layout.component.css'],
    standalone: true
})
export class FormLayoutComponent implements OnInit {
  @Input() screenTitle: string = "";
  @Input() screenDescription: string = "";


  constructor() { }

  ngOnInit(): void {
  }

}
