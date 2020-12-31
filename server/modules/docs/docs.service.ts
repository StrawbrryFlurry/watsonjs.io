import { BadRequestException, Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { glob } from 'glob';
import { join } from 'path';

@Injectable()
export class DocsService {
  private docsPath = join(__dirname, '../browser/assets/content/docs');

  async getDocDataByName(name: string) {
    if (typeof name === 'undefined') {
      throw new BadRequestException(
        'An argument for the document name was not provided'
      );
    }

    const files = await new Promise<string[]>((resolve, reject) => {
      glob(`${this.docsPath}/*${name}*.md`, (err, matches) => {
        if (err) {
          return reject(err);
        }

        resolve(matches);
      });
    });

    if (!files) {
      throw new BadRequestException('The file does not exist');
    }

    if (files.length === 0) {
      throw new BadRequestException('No file with this name was found');
    }

    if (files.length > 1) {
      throw new BadRequestException('Multiple files with the wildcard exist');
    }

    return this.readFile(files[0]);
  }

  async readFile(filePath: string) {
    const fileContent = promises.readFile(filePath, { encoding: 'utf-8' });

    return fileContent;
  }
}
