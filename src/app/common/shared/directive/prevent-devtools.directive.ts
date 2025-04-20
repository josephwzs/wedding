import { Directive, OnInit } from '@angular/core';
import { Location } from '@angular/common'

@Directive({
    selector: '[appPreventDevtools]',
    standalone: true
})
export class PreventDevtoolsDirective implements OnInit{

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    function ctrlShiftKey(e: any, key: any){
      return e.ctrlKey && e.shiftKey && e.key === key;
    }
    document.onkeydown = function(e){
      if(
        e.key == "F12"||
        ctrlShiftKey(e,'C') ||
        ctrlShiftKey(e,'J') ||
        ctrlShiftKey(e,'I') ||
        (e.ctrlKey && e.key == 'U')
      ){
        return false;
      }return true;
    }
    this.detectDevTool();
  }
  ctrlShiftKey(e: any, key: any){
    return e.ctrlKey && e.shiftKey && e.key === key;
  }
  ngAfterContentChecked(): void {
    this.detectDevTool();
  }

  detectDevTool(){
    let minimumResponseTime = 100;
    let start = new Date().getTime();
    eval("debugger");
    let end = new Date().getTime();
    if(isNaN(start)|| isNaN(end) || end - start > minimumResponseTime){
      window.location.assign("https://www.google.com")
    }
  }
}
