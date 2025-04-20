import { Component, ComponentFactoryResolver, ContentChild, ElementRef, forwardRef, Input, OnChanges, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ImageModelComponent } from '../image-model/image-model.component';

@Component({
    selector: 'app-image-slide',
    templateUrl: './image-slide.component.html',
    styleUrls: ['./image-slide.component.css'],
    encapsulation: ViewEncapsulation.ShadowDom,
    standalone: true,
    imports: [ImageModelComponent],
})
export class ImageSlideComponent implements OnInit, OnChanges {
  @Input() image1: string = "";
  @Input() image2: string = "";
  @Input() image3: string = "";
  @Input() image4: string = "";
  @Input() tutorId: string = "";
  @Input() slider: string = "";
  @Input() country: string = "";
  @Input() experience: string = "";
  @Input() profession: string = ""; 

  // additional model information
  @Input() age: string = "";
  @Input() race: string = "";
  @Input() sex: string = "";
  @Input() yearsTeaching: string = "";
  @Input() school: string = "";
  @Input() degree: string = "";
  @Input() language: string = "";
  @Input() hobby: string = "";
  @Input() about: string = "";

  firstImage: string = "";
  secondImage: string = "";
  thirdImage: string = "";
  lastImage: string = "";
  profileImage: string = "";
  // @ViewChild("componentHolder", { read: ViewContainerRef }) componentHolder!: ViewContainerRef;
  // @ViewChild("imageSlider", {read: ViewContainerRef}) imageSlider!: ViewContainerRef
  // @ViewChild("imageSlider", {read: ElementRef}) imageSlider!: ElementRef;
  // @ContentChild('imageSliders') imageSliders :ElementRef | undefined;
  @ViewChild(ImageModelComponent) imageModelComponent!: ImageModelComponent;
    
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }
  ngOnInit(): void {
    this.firstImage = "/assets/img/tutors/" + this.image1 + ".jpg"
    this.secondImage = "/assets/img/tutors/" + this.image2 + ".jpg"
    this.thirdImage = "/assets/img/tutors/" + this.image3 + ".jpg"
    this.lastImage = "/assets/img/tutors/" + this.image4 + ".jpg"
    this.profileImage = "/assets/img/tutors/" + this.tutorId + "-profile.jpg"
  }
  // public createComponent(): void {
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ImageSlideComponent);
  //   const componentRef = this.componentHolder.createComponent(componentFactory);
  // }
  // ngAfterContentInit(){
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ImageSlideComponent);
  //   this.imageSlider.createComponent(componentFactory)
  // }

  ngOnChanges(): void {

  }

  addImageModel(){
    this.imageModelComponent.openModel();
  }
}
