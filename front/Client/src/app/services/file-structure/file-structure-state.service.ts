import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileExtension, FileStructure, FileStructureService } from './file-structure.service';

// сервис хранит общее состояние структуры файлов и текущие файлы и папки
@Injectable({
  providedIn: 'root'
})
export class FileStructureStateService {
  fullStructure: BehaviorSubject<FileStructure[]> = new BehaviorSubject<FileStructure[]>([])
  fullStructure$ = this.fullStructure.asObservable();

  selectedItem: FileStructure | undefined
  selectedFolder: FileStructure | undefined

  _parentBySelected: BehaviorSubject<FileStructure | undefined> = new BehaviorSubject<FileStructure | undefined>(undefined)
  _parentBySelected$ = this._parentBySelected.asObservable();

  constructor(
    private fileStructureService: FileStructureService
  ) {
    this.init()
  }

  init() {
    this.fileStructureService.getFileStructure()
      .subscribe(s => {
        this.fullStructure.next(s)
      })

    if (this.selectedItem) {
      this.setSelectedItem(this.selectedItem)
    }

    if (this.selectedFolder) {
      this.setSelectedItem(this.selectedFolder)
    }
  }

  setSelectedItem(item: FileStructure) {

    switch (item.extension) {
      case FileExtension.Line | FileExtension.Point | FileExtension.Polygone | FileExtension.Text:
        this.selectedItem = item

        if (!item.parentId) { return }

        this.fileStructureService.getParent(item.parentId)
          .subscribe(p => {
            this._parentBySelected.next(p)
          })

        break
      case FileExtension.Folder:
        this.selectedFolder = item
        this.fileStructureService.getParent(item.id)
          .subscribe(p => {
            this._parentBySelected.next(p)
          })

        break
    }

  }

  findById(where: FileStructure[], id: number | undefined): FileStructure | undefined {

    if (!id) { return undefined }

    let finded: FileStructure | undefined

    where.forEach(fs => {
      if (fs.id == id) {
        finded = fs
      }

      if (!finded) {
        finded = this.findById(fs.children, id)
      }

    })

    return finded
  }

}
