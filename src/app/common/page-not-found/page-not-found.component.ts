import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css'],
    standalone: true
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.querySelector("body")?.classList.add("no-layout");
  }

  ngOnDestroy(): void {
    document.querySelector("body")?.classList.remove("no-layout");
  }

}

