import { Injectable } from '@angular/core';
import { FileStructureStateService } from '../file-structure/file-structure-state.service';
import { FileExtension, FileStructure, FileStructureService } from '../file-structure/file-structure.service';
import { Action, PopUpData } from '../popup/popup-entities';
import { PopupService } from '../popup/popup.service';
import { TextInputService } from '../text-input/text-input.service';

// сервис для обработки дейтсвий с popup меню
@Injectable({
  providedIn: 'root'
})
export class EditActionsHandlerService {

  constructor(
    private popupService: PopupService,
    private fileStructureStateService: FileStructureStateService,
    private fileStructureService: FileStructureService,
    private textInputService: TextInputService
  ) { }

  handle(item: PopUpData | undefined) {
    if (!item) { return }

    this.popupService.toUnvisible()

    switch (item.action) {
      case Action.rename:
        if (item.structureItem) { this.onRenameAction(item.structureItem) }
        break
      case Action.delete:
        if (item.structureItem) { this.onDelete(item.structureItem) }
        break
      case Action.createFolder:
        this.onCreateFolder()
        break
      case Action.createText:
        this.onCreateText()
        break
      case Action.createPoint:
        this.onCreatePoint()
        break
      case Action.createLine:
        this.onCreateLine()
        break
      case Action.createPolygone:
        this.onCreatePolygone()
        break
    }

  }

  onRenameAction(fs: FileStructure) {
    this.textInputService.setLable('Введите новое название')
    console.log('onRenameAction', fs)

    this.textInputService.value$.subscribe(name => {

      this.fileStructureService.rename(fs.id, name).subscribe(e => {
        if(e) { this.fileStructureStateService.init() }
      })

      this.textInputService.dispose()
    })
  }

  onDelete(fs: FileStructure) {
    this.fileStructureService.delete(fs.id).subscribe(e => {
      if(e) { this.fileStructureStateService.init() }
    })
  }

  onCreateFolder() {
    this.textInputService.setLable('Введите название папки')

    this.create(FileExtension.Folder)

  }

  onCreateText() {
    this.textInputService.setLable('Введите название файла')

    this.create(FileExtension.Text)
  }

  onCreatePoint() {
    this.textInputService.setLable('Введите название файла')
    this.create(FileExtension.Point)

  }

  onCreateLine() {
    this.textInputService.setLable('Введите название файла')
    this.create(FileExtension.Line)
  }

  onCreatePolygone() {
    this.textInputService.setLable('Введите название файла')
    this.create(FileExtension.Polygone)
  }

  private create(ex: FileExtension) {
    this.textInputService.value$.subscribe(name => {

      let s

      if (this.fileStructureStateService.selectedFolder) {
        s = this.fileStructureService.createFile(name, ex, this.fileStructureStateService.selectedFolder.id)
      } else {
        s = this.fileStructureService.createFile(name, ex)
      }

      s.subscribe(e => {
        if(e) { this.fileStructureStateService.init() }
      })

      this.textInputService.dispose()
    })
  }
}
