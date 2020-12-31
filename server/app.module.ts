import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';

import { AppServerModule } from '../src/main.server';
import { DocsModule } from './modules/docs/docs.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/watsonjsio/browser'),
    }),
    DocsModule,
  ],
})
export class AppModule {}
