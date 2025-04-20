import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bars',
  standalone: true,
  imports: [NgIf],
  templateUrl: './side-bars.component.html',
  styleUrl: './side-bars.component.css'
})


export class SideBarsComponent {
  isMuted: boolean = false

  onClick(){
  const mediaElements = document.querySelectorAll<HTMLMediaElement>('audio, video');
  mediaElements.forEach((media: HTMLMediaElement) => {
    media.muted = true;
  });
  this.isMuted = true
};



  
  offClick(){
    const mediaElements = document.querySelectorAll<HTMLMediaElement>('audio, video');
    mediaElements.forEach((media: HTMLMediaElement) => {
      media.muted = false
});
this.isMuted = false
  }

  onSelect(id:string){
    document.getElementById(id)!.scrollIntoView({ 
      behavior: "smooth" 
    });
  }
}
