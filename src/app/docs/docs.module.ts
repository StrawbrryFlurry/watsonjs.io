import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { CommandsComponent } from './pages/commands/commands.component';
import { DocComponent } from './pages/doc/doc.component';
import { EventsComponent } from './pages/events/events.component';
import { FirstStepsComponent } from './pages/first-steps/first-steps.component';
import { IntroductionComponent } from './pages/introduction/introduction.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { ReceiversComponent } from './pages/receivers/receivers.component';
import { RenderingService } from './services/rendering.service';

@NgModule({
  declarations: [
    FirstStepsComponent,
    IntroductionComponent,
    ReceiversComponent,
    CommandsComponent,
    ProvidersComponent,
    EventsComponent,
    DocComponent,
  ],
  imports: [CommonModule, MarkdownModule.forRoot()],
  providers: [RenderingService],
})
export class DocsModule {}
