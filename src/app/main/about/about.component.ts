import { Component, HostListener, OnInit } from '@angular/core';
import { ImageSlideComponent } from 'src/app/common/shared/image-slide/image-slide.component';
import { VideoSliderComponent } from 'src/app/common/shared/video-slider/video-slider.component';
import { Meta } from '@angular/platform-browser';
import { NgIf, NgStyle } from '@angular/common';
import { VideoBackgroundComponent } from 'src/app/common/shared/video-background/video-background.component';
import { SideBarsComponent } from "./side-bars/side-bars.component";
import { ImageSliderComponent } from 'src/app/common/shared/image-slider/image-slider.component';
import Lenis from '@studio-freight/lenis';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ImageSlideComponent,ImageSliderComponent, VideoBackgroundComponent, NgStyle, NgIf, SideBarsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  dynamicBackGround = 'rgba(201, 201, 201, .9)';
  mouseEntered = 0
  primarySelected: boolean = false;
  secondarySelected: boolean = true;
  constructor(private meta: Meta) { }


  ngOnInit(): void {
// smooth-scroll.ts


const lenis = new Lenis({
  duration: 0.02, // Lower duration makes it faster (default is 1.2)
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -20 * t)), // Adjust easing for a snappier feel
})


const scrollSpeedFactor = 3; // Increase this for faster scroll per roll

window.addEventListener('wheel', (e: WheelEvent) => {
  e.preventDefault()
  const adjustedDelta = e.deltaY * scrollSpeedFactor;  // Increase delta to scroll faster per scroll roll
  lenis.scrollTo(lenis.scroll + adjustedDelta)  // Adjust scroll target based on modified deltaY
}, { passive: false })

const raf = (time: number) => {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)


    
  }
  /*@HostListener('document: mousemove', ['$event']) 
  videoMask(e: any){
    if(this.mouseEntered == 1){
      let videoMaskWidth = window.innerWidth;
      let videoMaskHeight = window.innerHeight;
      let videoMaskXpercentage = e.offsetX/videoMaskWidth * 100;
      let videoMaskYpercentage = e.offsetY/videoMaskHeight * 100/7;
      this.dynamicBackGround =  'radial-gradient(circle at ' + videoMaskXpercentage + '% ' + videoMaskYpercentage + '%, transparent 20rem, rgba(201, 201, 201, .9) 30rem)';
    }

  }*/
  selectPrimary(event: any){
    this.primarySelected = true;
    this.secondarySelected = false;
  }
  selectSecondary(event: any){
    this.primarySelected = false;
    this.secondarySelected = true;
  }
}

