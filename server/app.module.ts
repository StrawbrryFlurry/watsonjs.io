import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppServerModule } from '../src/main.server';
import { DocsModule } from './modules/docs/docs.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/watsonjsio/browser'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'browser', 'assets', 'content', 'images'),
      serveStaticOptions: {
        extensions: ['.jpg'],
      },
      serveRoot: '/static',
    }),
    DocsModule,
  ],
})
export class AppModule {}
