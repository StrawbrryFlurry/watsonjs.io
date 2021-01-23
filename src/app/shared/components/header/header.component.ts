import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'watson-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() menuTrigger = new EventEmitter<boolean>();

  faGithub = faGithub;
  faDiscord = faDiscord;

  constructor() {}

  public onMenuTrigger() {
    this.menuTrigger.emit();
  }

  ngOnInit(): void {}
}
