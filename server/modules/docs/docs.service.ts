import { BadRequestException, Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { glob } from 'glob';
import { join } from 'path';

@Injectable()
export class DocsService {
  private docsPath = join(__dirname, '../browser/assets/content/docs');

  async getDocDataByName(name: string, category?: string) {
    if (typeof name === 'undefined') {
      throw new BadRequestException(
        'An argument for the document name was not provided'
      );
    }

    let path = `${this.docsPath}`;

    if (category !== undefined) {
      path = `${path}/${category}/${name}`;
    } else {
      path = `${path}/${name}`;
    }

    const files = await this.getFiles(path);

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

  private async readFile(filePath: string) {
    const fileContent = promises.readFile(filePath, { encoding: 'utf-8' });

    return fileContent;
  }

  private getFiles(path: string) {
    return new Promise<string[]>((resolve, reject) => {
      glob(`${path}.md`, (err, matches) => {
        if (err) {
          return reject(err);
        }

        resolve(matches);
      });
    });
  }
}
