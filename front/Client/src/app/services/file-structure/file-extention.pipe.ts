import { Pipe, PipeTransform } from '@angular/core';
import { FileExtension } from './file-structure.service';

@Pipe({
  name: 'fileExtention'
})
export class FileExtentionPipe implements PipeTransform {

  transform(value: FileExtension, ...args: unknown[]): string {
    let ret = ''

    switch (value) {
      case FileExtension.Folder:
        ret = ''
        break
      case FileExtension.Line:
        ret = 'line'
        break
      case FileExtension.Point:
        ret = 'point'
        break
      case FileExtension.Polygone:
        ret = 'ploygone'
        break
      case FileExtension.Text:
        ret = 'text'
        break
    }

    return ret;
  }

}
