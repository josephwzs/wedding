import { style } from '@angular/animations';
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-video-slider',
    templateUrl: './video-slider.component.html',
    styleUrls: ['./video-slider.component.css'],
    encapsulation: ViewEncapsulation.ShadowDom,
    standalone: true,
    imports: [NgStyle],
})
export class VideoSliderComponent implements OnInit {
  dynamicBackGround = 'rgba(201, 201, 201, .9)';
  mouseEntered = 0

  constructor() { }
  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(e: any) {
  //   this.videoMask(e)
  // }
  // mask: string = "";
  ngOnInit(): void {
    
  //  let btn = document.querySelector('.video-mask') as HTMLElement;
  //   btn?.addEventListener('mousemove', e => {
  //     let videoMaskWidth = btn?.clientWidth??1
  //     let videoMaskHeight = btn?.clientHeight??1;
  //     let videoMaskXpercentage = Math.round(e.pageX / videoMaskWidth * 100);
  //     let videoMaskYpercentage = Math.round(e.pageY / videoMaskHeight * 100);
  //     btn.style.background =  'radial-gradient(at ' + videoMaskXpercentage + '% ' + videoMaskYpercentage + '%, #3498db, #9b59b6)';
    
  //   });
      
      // "background: 'radial-gradient(at ' + videoMaskXpercentage + '% ' + videoMaskYpercentage + '%, #3498db, #9b59b6)";
    // let rect = e?.target?.getBoundingClientRect();
    // let x = e.clientX - rect.left;
    // let y = e.clientY - rect.top;
    // btn?.style.setProperty('--x', x + 'px');
    // btn?.style.setProperty('--y', y + 'px');
// });
  }
  @HostListener('document: mousemove', ['$event']) 
  videoMask(e: any){
    if(this.mouseEntered == 1){
      let videoMaskWidth = window.innerWidth;
      let videoMaskHeight = window.innerHeight;
      let videoMaskXpercentage = e.offsetX/videoMaskWidth * 100;
      let videoMaskYpercentage = e.offsetY/videoMaskHeight *100;
      this.dynamicBackGround =  'radial-gradient(circle at ' + videoMaskXpercentage + '% ' + videoMaskYpercentage + '%, transparent 10rem, rgba(201, 201, 201, .9) 12.5rem)';
    }

  }

}
