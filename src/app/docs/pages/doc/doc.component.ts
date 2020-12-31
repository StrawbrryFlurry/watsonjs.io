import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'watson-doc',
  template: `<div class="wrapper">
    <div class="markdown-container">
      <markdown [data]="content"></markdown>
    </div>
  </div>`,
  styleUrls: ['./doc.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocComponent implements OnInit {
  constructor(private readonly http: HttpClient) {}

  private apiURL = 'http://localhost:4200/api/docs';
  public content = '';

  ngOnInit() {
    this.http
      .get(`${this.apiURL}/first-steps`, {
        responseType: 'text',
      })
      .subscribe((content) => {
        this.laodMarkdown(content);
      });
  }

  private laodMarkdown(content: string) {
    this.content = content;
  }
}
