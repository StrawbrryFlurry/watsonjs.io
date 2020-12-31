import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { DocComponent } from './pages/doc/doc.component';
import { RenderingService } from './services/rendering.service';

@NgModule({
  declarations: [DocComponent],
  imports: [CommonModule, MarkdownModule.forRoot()],
  providers: [RenderingService],
})
export class DocsModule {}
