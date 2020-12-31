import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public menuOpen = true;

  constructor(title: Title) {
    title.setTitle('Watsonjs');
  }

  public onMenuTrigger() {
    this.menuOpen = !this.menuOpen;
  }
}
