import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { RootScreen } from '../base/root-screen';
import { HomeService } from './service/home.service';
import { VideoSliderComponent } from '../shared/video-slider/video-slider.component';
import { ImageSlideComponent } from '../shared/image-slide/image-slide.component';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [NgClass, NgIf, ImageSlideComponent, VideoSliderComponent]
})
export class HomeComponent  extends RootScreen implements OnInit, OnDestroy {
  
  isVideoOpen: boolean = false;
  video: HTMLVideoElement | undefined;
  primarySelected: boolean = false;
  secondarySelected: boolean = true;

  constructor(
    formBuilder: UntypedFormBuilder,
    private homeService: HomeService

  ) {
    super();
  }

  @ViewChild('first_video') videoplayer: ElementRef | undefined;

  ngOnInit(): void {

    document.querySelector("body")?.classList.add("no-layout");
    this.primarySelected = true;
    this.secondarySelected = false;
  }
  ngOnDestroy(): void {
    document.querySelector("body")?.classList.remove("no-layout");
  }
  closeVideo(event: any){
    event!!?this.isVideoOpen = false : this.isVideoOpen = true;
    this.video = this.videoplayer?.nativeElement;
    if(this.video!!){
    this.video.pause();
    this.video.currentTime = 0;
    this.video.load();
    }
    
  }
  openVideo(event: any){
    event!!?this.isVideoOpen = true : this.isVideoOpen = false;
    this.video = this.videoplayer?.nativeElement;
    if(this.video!!){
      this.video.play();
      }
  }
  selectPrimary(event: any){
    this.primarySelected = true;
    this.secondarySelected = false;
  }
  selectSecondary(event: any){
    this.primarySelected = false;
    this.secondarySelected = true;
  }

}

