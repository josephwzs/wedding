import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-header-bar',
    templateUrl: './header-bar.component.html',
    styleUrls: ['./header-bar.component.css'],
    standalone: true,
    imports: [NgIf]
})
export class HeaderBarComponent implements OnInit {
  @Output() onDropdownEvent: EventEmitter<any> = new EventEmitter();
  
  isOpen: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  openDropDown(event: any){
    document.querySelector('.dropdown_menu')?.classList.toggle('open');
    if (document.querySelector('.dropdown_menu')?.classList.contains('open')){
      this.isOpen = true
      this.onDropdownEvent.emit("open")
    }else{
      this.isOpen = false
      this.onDropdownEvent.emit("close")
    }
  }
  openProgramems(event: any){
    if(event!! && event.target.ariaExpanded == "true"){this.onDropdownEvent.emit("open")}
    if(event!! && event.target.ariaExpanded == "false"){this.onDropdownEvent.emit("close")}
  }

}
