import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  route?: string;
  children?: MenuItem[];
}

export interface MenuItemData extends MenuItem {
  opened?: boolean;
  isRoot?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    name: 'Introduction',
    route: 'introduction',
  },
  {
    name: 'Overview',
    children: [
      {
        name: 'First steps',
        route: 'first-steps',
      },
      {
        name: 'Receivers',
        route: 'receivers',
      },
      {
        name: 'Providers',
        route: 'providers',
      },
      {
        name: 'Modules',
        route: 'modules',
      },
      {
        name: 'Decorators',
        route: 'decorators',
      },
    ],
  },
  {
    name: 'Stuff',
    children: [
      {
        name: 'First steps',
        route: 'first-steps',
      },
      {
        name: 'First steps',
        route: 'first-steps',
      },
      {
        name: 'First steps',
        route: 'first-steps',
      },
    ],
  },
  {
    name: 'Test',
    route: 'first',
  },
];

@Component({
  selector: 'watson-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public transformer(item: MenuItem) {
    return {
      ...item,
      opened: false,
      isRoot: true,
    };
  }

  public expandNav(item: MenuItem) {
    this.menuItems = this.menuItems.map((_item) => {
      if (_item.name === item.name) {
        return { ..._item, opened: !_item.opened };
      }

      return _item;
    });
  }

  menuItems: MenuItemData[];

  constructor() {
    this.menuItems = MENU_ITEMS.map(this.transformer);
  }
}
