import { Injectable } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

import { NotParsableException } from './exceptions';

/**
 * Custom markdown elements:
 * @HTML
 * +++
 * <h1>Heya!</h1>
 * +++
 */

interface ElementType {
  type: string;
  marker: string;
}

@Injectable()
export class RenderingService {
  constructor(private readonly markdownService: MarkdownService) {}

  private elementTypes: ElementType[] = [
    {
      type: 'HTML',
      marker: '+++',
    },
  ];

  public parseMarkdown(mdData: string) {
    const lines: string[] = mdData.split('\n');
    const parsedLines: string[] = [];

    let isParsing: boolean = false;
    let parsingMarker: string;

    lines.forEach((line, idx) => {
      if (isParsing && !line.startsWith(parsingMarker)) {
        return;
      } else if (isParsing && line.startsWith(parsingMarker)) {
        isParsing = false;
        parsingMarker = null;
        return;
      }

      const parsableElement = this.elementTypes.find((e) =>
        line.startsWith(e.marker)
      );

      if (parsableElement !== undefined) {
        const closingLine = lines.indexOf(parsableElement.marker, idx + 1);

        if (closingLine === -1) {
          throw new NotParsableException(
            `No closing line was provided for type ${
              parsableElement.type
            } with marker ${parsableElement.marker} for line ${idx + 1}`
          );
        }

        parsingMarker = parsableElement.marker;
        isParsing = true;

        const linesToParse = lines.slice(idx, closingLine);
        const parsed = this.parseType(linesToParse, parsableElement);
        parsedLines.push(parsed);
      } else {
        const parsed = this.parseFromMarkdown(line);
        parsedLines.push(parsed);
      }
    });

    return parsedLines.join(`\n`);
  }

  private parseType(lines: string[], type: ElementType) {
    if (type.type === 'HTML') {
      return lines.join(`\n`);
    }
  }

  private parseFromMarkdown(line: string) {
    return this.markdownService.compile(line, true, true, {});
  }
}
