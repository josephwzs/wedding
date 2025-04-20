import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { StringService } from 'src/app/common/base/string.service';

@Component({
    selector: 'app-in-progress',
    templateUrl: './in-progress.component.html',
    styleUrls: ['./in-progress.component.css'],
    standalone: true
})
export class InProgressComponent implements OnInit {
  screenLabels!: StringService;

  constructor(
    private location: Location,
    stringService: StringService,) {
      this.screenLabels = stringService;
    }

  ngOnInit(): void {
  }
  onBack(){
      this.location.back(); 
  }

}
