import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

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
  constructor(
    private readonly http: HttpClient,
    private readonly router: ActivatedRoute,
    private readonly title: Title
  ) {}

  private apiURL = environment.apiURI;
  public content = '';

  ngOnInit() {
    this.router.params.subscribe((params) => {
      const category = params['category'];
      const title = params['title'];
      const formattedTitle = this.formatTitle(title);
      this.title.setTitle(formattedTitle + ' - Watson');
      let url = `${this.apiURL}/docs`;

      if (category !== undefined) {
        url = `${url}/${category}/${title}`;
      } else {
        url = `${this.apiURL}/docs/${title}`;
      }

      this.http
        .get(url, {
          responseType: 'text',
        })
        .subscribe((content) => {
          this.laodMarkdown(content);
        });
    });
  }

  private formatTitle(t: string) {
    return `${t
      .split('-')
      .map((t) => t[0].toUpperCase() + t.slice(1, t.length))
      .join(' ')}`;
  }

  private laodMarkdown(content: string) {
    this.content = content;
  }
}
