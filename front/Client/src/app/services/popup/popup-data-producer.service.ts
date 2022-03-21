import { Injectable } from '@angular/core';
import { FileStructure } from '../file-structure/file-structure.service';
import { Action, PopUpData } from './popup-entities';

@Injectable({
  providedIn: 'root'
})
export class PopupDataProducerService {

  constructor() { }

  forClickOnFolderContetn() {
    let arr: PopUpData[] = []
    let creating = new PopUpData(Action.none, 'Создать')

    creating.childs.push(
      new PopUpData(Action.createFolder, 'Папка'),
      new PopUpData(Action.createText, 'Текст'),
      new PopUpData(Action.createPoint, 'Точки'),
      new PopUpData(Action.createPolygone, 'Полигоны'),
      new PopUpData(Action.createLine, 'Линии')
    )

    arr.push(creating)
    return arr
  }

  forClickOnFolderContentItem(fs: FileStructure| undefined = undefined) {

    let arr: PopUpData[] = []

    arr.push(
      new PopUpData(Action.rename, 'Переименовать', fs),
      new PopUpData(Action.delete, 'Удалить', fs)
    )
    
    return arr

  }

  forClickOnTreeViewContentItem(fs: FileStructure| undefined = undefined) {

    let arr: PopUpData[] = []
    
    arr.push(
      new PopUpData(Action.delete, 'Удалить', fs)
    )
    
    return arr

  }
}