import { Controller, Get, Param } from '@nestjs/common';

import { DocsService } from './docs.service';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get(':docName')
  getDocByName(@Param('docName') docName: string) {
    return this.docsService.getDocDataByName(docName);
  }

  @Get(':category/:docName')
  getCategoryDocByName(
    @Param('docName') docName: string,
    @Param('category') category: string
  ) {
    return this.docsService.getDocDataByName(docName, category);
  }
}
