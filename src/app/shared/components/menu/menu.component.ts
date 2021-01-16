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
        name: 'Modules',
        route: 'modules',
      },
      {
        name: 'Providers',
        route: 'providers',
      },
      {
        name: 'Receivers',
        route: 'receivers',
      },
      {
        name: 'Commands',
        route: 'commands',
      },
      {
        name: 'Events',
        route: 'events',
      },
      {
        name: 'Decorators',
        route: 'decorators',
      },
    ],
  },
  {
    name: 'Guides',
    children: [
      {
        name: 'Database',
        route: 'database',
      },
      {
        name: 'Task scheduling',
        route: 'task-scheduling',
      },
    ],
  },
  {
    name: 'Internals',
    children: [
      {
        name: 'Execution context',
        route: 'execution-context',
      },
    ],
  },
  {
    name: 'CLI',
    children: [
      {
        name: 'Setup',
        route: 'setup',
      },
      {
        name: 'Usage',
        route: 'usage',
      },
    ],
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
