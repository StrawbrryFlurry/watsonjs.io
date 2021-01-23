import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MenuItemData } from '../menu.component';

@Component({
  selector: 'watson-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  @Input() item: MenuItemData;
  @Input() children?: MenuItemData;
  @Input() parent?: MenuItemData;

  @Output() expandClick = new EventEmitter<boolean>();

  public handleExpandClick() {
    this.expandClick.emit();
  }

  constructor() {}

  ngOnInit(): void {}
}
