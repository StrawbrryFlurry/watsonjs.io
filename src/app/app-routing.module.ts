import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocComponent } from './docs/pages/doc/doc.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/introduction',
    pathMatch: 'full',
  },
  {
    path: 'pages/:title',
    component: DocComponent,
  },
  {
    path: 'pages/:category/:title',
    component: DocComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
