import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ImageSlideComponent } from 'src/app/common/shared/image-slide/image-slide.component';
import { VideoSliderComponent } from 'src/app/common/shared/video-slider/video-slider.component';
import { Meta } from '@angular/platform-browser';
import { NgIf, NgStyle } from '@angular/common';
import { VideoBackgroundComponent } from 'src/app/common/shared/video-background/video-background.component';
import { SideBarsComponent } from "./side-bars/side-bars.component";
import { ImageSliderComponent } from 'src/app/common/shared/image-slider/image-slider.component';
import Lenis from '@studio-freight/lenis';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { DOCUMENT } from '@angular/common';

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
  constructor(private meta: Meta, @Inject(DOCUMENT) private document: Document) { }


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

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

reveals.forEach(el => observer.observe(el));


document.addEventListener('mousemove', (e: MouseEvent) => {
  const el = document.querySelector('.interactive') as HTMLElement | null;

  if (!el) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  el.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});
    
gsap.registerPlugin(ScrollTrigger);

// STEP 1: Wrap each letter
document.querySelectorAll<HTMLElement>('.fade-text').forEach(el => {
  const text = el.textContent || '';
  el.textContent = '';

  const words1 = text.split(' ');

  for (const word of words1) {
    const wordSpan = document.createElement('span');
    wordSpan.classList.add('word'); // <- style this with display: inline-block or inline-flex if needed
  

    for (const char of word) {
      const charSpan = document.createElement('span');
      charSpan.classList.add('letter');
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    }

    // Add a space after each word
    const space = document.createTextNode('\u00A0');
    el.appendChild(wordSpan);
    el.appendChild(space);
  }

  const letters = document.querySelectorAll<HTMLElement>('.letter');

gsap.fromTo(letters,
  { opacity: .2 },
  {
    opacity: 1,
    stagger: 0.05,
    scrollTrigger: {
      trigger: ".fade-text",
      start: "top 90%",
      end: "bottom 60%",
      scrub: true,
    }
  }
);



const words = document.querySelectorAll<HTMLSpanElement>(".orbit-track span");

const radius = 120;
const total = words.length;

words.forEach((word, i) => {
  const angle = (360 / total) * i;
  word.style.transform = `
    rotate(${angle}deg) 
    translateY(-${radius}px) 
    rotate(-${angle}deg)
  `;
});

const cursor = document.querySelector(".custom-cursor") as HTMLElement;
const targets = document.querySelectorAll<HTMLElement>(".hover-target");
const notTargets = document.querySelectorAll<HTMLElement>(".not-hover-target");
const normalTargets = document.querySelectorAll<HTMLElement>(".normal-hover-target");

// 🟩 Correct anchor point via GSAP
gsap.set(cursor, {
  xPercent: -50,
  yPercent: -50,
});

// 🟩 Mouse tracking
document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.7,
    ease: "power3.out",
  });
});

// 🟩 Hover effects
targets.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      width: "30rem",
      height: "30rem",
      backgroundColor: "#eb3939",
      mixBlendMode: "exclusion", 
      duration: 0.7,
      opacity: 1,
    });
  });



  el.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      width: "2rem",
      height: "2rem",
      backgroundColor: "#eb3939;",
      mixBlendMode: "normal", 
      duration: 0.3,
      opacity: 1,
    });
  });
});

  // remove effects
  notTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(cursor, {
        width: "2rem",
        height: "2rem",
        backgroundColor: "#eb3939",
        mixBlendMode: "normal", 
        opacity: 0,
        duration: 0.7,
      });
    });
  
  
  
    el.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        width: "2rem",
        height: "2rem",
        backgroundColor: "#eb3939",
        mixBlendMode: "normal", 
        opacity: 1,
        duration: 0.3,
      });
    });
  });

  normalTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      gsap.to(cursor, {
        width: "2rem",
        height: "2rem",
        backgroundColor: "#eb3939",
        mixBlendMode: "normal", 
        opacity: 1,
        duration: 0.3,
      });
    });
  
  
  
    el.addEventListener("mouseleave", () => {
      gsap.to(cursor, {
        width: "2rem",
        height: "2rem",
        backgroundColor: "#eb3939",
        mixBlendMode: "normal", 
        opacity: 1,
        duration: 0.3,
      });
    });
  });

  

  document.querySelectorAll<HTMLElement>('b').forEach(el => {
    const text = el.textContent || '';
    el.textContent = '';
  
    const words = text.split(' ');
  
    for (const word of words) {
      const wordSpan = document.createElement('span');
      wordSpan.classList.add('word');
  
      for (const char of word) {
        const charSpan = document.createElement('span');
        charSpan.classList.add('letter2');
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      }
  
      el.appendChild(wordSpan);
      el.appendChild(document.createTextNode('\u00A0')); // add non-breaking space
    }
  });
  
  // Animate all letters across all <b> tags
  const letters2 = document.querySelectorAll<HTMLElement>('b .letter2');
  
  gsap.fromTo(letters2,
    { opacity: 0.2 },
    {
      opacity: 1,
      stagger: 0.5,
      scrollTrigger: {
        trigger: ".fade-text2", // or `.col` if you want the whole column to trigger it
        start: "top 45%",
        end: "bottom 30%",
        scrub: true,
      }
    }
  );
  
  document.querySelectorAll<HTMLElement>('.fade-text-3').forEach(el => {
    const text = el.textContent || '';
    el.textContent = '';
  
    const words1 = text.split(' ');
  
    for (const word of words1) {
      const wordSpan = document.createElement('span');
      wordSpan.classList.add('word'); // <- style this with display: inline-block or inline-flex if needed
    
  
      for (const char of word) {
        const charSpan = document.createElement('span');
        charSpan.classList.add('letter3');
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      }
  
      // Add a space after each word
      const space = document.createTextNode('\u00A0');
      el.appendChild(wordSpan);
      el.appendChild(space);
    }
  
    const letters3 = document.querySelectorAll<HTMLElement>('.letter3');
  
  gsap.fromTo(letters3,
    { opacity: .2 },
    {
      opacity: 1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: ".fade-text-3",
        start: "top 90%",
        end: "bottom 70%",
        scrub: true,
      }
    }
  );
})

});


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
  rsvp(){
     this.document.location.href = 'https://withjoy.com/joseph-and-shivani-aug-25/rsvp'
}
}

