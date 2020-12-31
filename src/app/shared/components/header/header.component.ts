import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'watson-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() menuTrigger = new EventEmitter<boolean>();

  constructor() {}

  public onMenuTrigger() {
    this.menuTrigger.emit();
  }

  ngOnInit(): void {}
}
