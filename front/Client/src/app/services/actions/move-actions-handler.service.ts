import { Injectable } from '@angular/core';
import { FileStructureStateService } from '../file-structure/file-structure-state.service';
import { FileExtension, FileStructure } from '../file-structure/file-structure.service';
import { TextEditorService } from '../text-editor/text-editor.service';
import { MoveEvent, MoveType } from './actions';

// сервис для обработки дейтсвий с popup меню
@Injectable({
  providedIn: 'root'
})
export class MoveActionsHandlerService {
  downToId: number = -1
  constructor(
    private fileStructureStateService: FileStructureStateService,
    private textEditorService: TextEditorService
  ) { }

  handle(event: MoveEvent) {
    this.downToId = event.downToId

    switch (event.type) {
      case MoveType.up:
        this.fileStructureStateService.fullStructure
          .subscribe(this.onMoveUp.bind(this))
        break
      case MoveType.down:
        this.fileStructureStateService.fullStructure
          .subscribe(this.omMoveDown.bind(this))
        break
    }
  }

  private onMoveUp(structure: FileStructure[]) {
    if (!this.fileStructureStateService.selectedFolder) { return }
    this.move(structure, this.fileStructureStateService.selectedFolder.parentId)
  }

  private omMoveDown(structure: FileStructure[]) {
    this.move(structure, this.downToId)
  }

  private move(structure: FileStructure[], id: number | undefined) {

    let item = this.fileStructureStateService.findById(
      structure,
      id
    )

    if (!item) { return }

    switch (item.extension) {
      case FileExtension.Folder:
        this.fileStructureStateService.setSelectedItem(item)
        break
      case FileExtension.Text:
        this.textEditorService.openText(item.id)
        break
    }
  }
}