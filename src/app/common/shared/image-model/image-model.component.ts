import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-image-model',
    templateUrl: './image-model.component.html',
    styleUrls: ['./image-model.component.css'],
    standalone: true
})
export class ImageModelComponent implements OnInit {
  modelReference: any;

  @ViewChild(TemplateRef) modelTemplate: any;
  @Input() age: string = "age";
  @Input() race: string = "race";
  @Input() sex: string = "sex";
  @Input() yearsTeaching: string = "0";
  @Input() school: string = "school";
  @Input() degree: string = "degree";
  @Input() language: string = "English";
  @Input() country: string = "Singapore";
  @Input() occupation: string = "Occupation";
  @Input() hobby: string = "hobby";
  @Input() tutor: string = "name";
  @Input() about: string = "about";
  @Input() tutorId: string = "";
  profileImage: string = "";
  name: string = "";

 constructor(
    private modelService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.profileImage = "/assets/img/tutors/" + this.tutor + "-profile.jpg"
    this.name = this.tutor.charAt(0).toUpperCase() + this.tutor.slice(1);
  }

  openModel(){

  this.modelReference = this.modelService.open(this.modelTemplate, { size: "md", centered: true, windowClass: "modal-rounded" });
  }

}
