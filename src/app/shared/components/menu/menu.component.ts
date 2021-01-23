import { Component } from '@angular/core';

interface MenuItem {
  name: string;
  route?: string;
  children?: ChildItem[];
}

interface ChildItem {
  name: string;
  route?: string;
}

export interface MenuItemData extends MenuItem {
  opened?: boolean;
  isRoot?: boolean;
}

const nameToRoute = (name: string) => {
  return name.toLowerCase().split(' ').join('-');
};

const MENU_ITEMS: MenuItem[] = [
  {
    name: 'Introduction',
  },
  {
    name: 'Overview',
    children: [
      {
        name: 'First steps',
      },
      {
        name: 'Modules',
      },
      {
        name: 'Providers',
      },
      {
        name: 'Receivers',
      },
      {
        name: 'Commands',
      },
      {
        name: 'Events',
      },
      {
        name: 'Decorators',
      },
      {
        name: 'Inquirables',
      },
      {
        name: 'Custom components',
      },
    ],
  },
  {
    name: 'Guides',
    children: [
      {
        name: 'Error handling',
      },
      {
        name: 'Database',
      },
      {
        name: 'Task scheduling',
      },
    ],
  },
  {
    name: 'Internals',
    children: [
      {
        name: 'Execution context',
      },
      {
        name: 'Watson Application',
      },
    ],
  },
  {
    name: 'CLI',
    children: [
      {
        name: 'Setup',
      },
      {
        name: 'Usage',
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
    const routeName = nameToRoute(item.name);
    return {
      ...item,
      opened: false,
      isRoot: true,
      route: routeName,
      children: item.children?.map((e) => ({
        ...e,
        route: nameToRoute(e.name),
      })),
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
