import { Component, OnInit } from '@angular/core';
import { FileStructureStateService } from 'src/app/services/file-structure/file-structure-state.service';
import { FileStructure, FileStructureService } from 'src/app/services/file-structure/file-structure.service';
import { PopupDataProducerService } from 'src/app/services/popup/popup-data-producer.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { PopUpData } from 'src/app/services/popup/popup-entities';
import { EditActionsHandlerService } from 'src/app/services/actions/edite-actions-handler.service';

@Component({
  selector: 'app-folder-content',
  templateUrl: './folder-content.component.html',
  styleUrls: ['./folder-content.component.scss']
})
export class FolderContentComponent implements OnInit {
  parentBySelected: FileStructure | undefined

  constructor(
    public fileStructureStateService: FileStructureStateService,
    public fileStructureService: FileStructureService,
    private popupService: PopupService,
    private popupDataProducerService: PopupDataProducerService,
    private actionsHandler: EditActionsHandlerService
  ) { }

  ngOnInit(): void {
    this.fileStructureStateService._parentBySelected$.subscribe(p => {
      this.parentBySelected = p
    })
    this.popupService.action.subscribe(this.onPopUpAction.bind(this))
  }

  onPopUpAction(item: PopUpData | undefined) {
    if (!item) { return }

    this.popupService.toUnvisible()

    this.actionsHandler.handle(item)
  }

  onContentRigthClick(event: MouseEvent) {
    event.preventDefault()
    let el$ = event.target as HTMLElement

    if (el$.classList.contains('contetn')) {
      this.popupService.toVisible(event.clientY, event.clientX, this.popupDataProducerService.forClickOnFolderContetn())
    }
  }
}