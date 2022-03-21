import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileStructure } from 'src/app/services/file-structure/file-structure.service';
import { FileStructureStateService } from 'src/app/services/file-structure/file-structure-state.service';
import { PopupService } from 'src/app/services/popup/popup.service';
import { PopupDataProducerService } from 'src/app/services/popup/popup-data-producer.service';

@Component({
  selector: 'app-file-structure-tree',
  templateUrl: './file-structure-tree.component.html',
  styleUrls: ['./file-structure-tree.component.scss']
})
export class FileStructureTreeComponent implements OnInit {
  @Input() fileStructire: FileStructure[] | undefined
  @Output() selected = new EventEmitter<FileStructure>()

  constructor(
    private fileStructureStateService: FileStructureStateService,
    private popupService: PopupService,
    private popuDataProducerService: PopupDataProducerService
  ) { }

  ngOnInit(): void {
  }

  onDisposerClick(content: HTMLElement, folder: HTMLElement) {
    folder.classList.toggle('folder-down')
    content.classList.toggle('disable')
  }

  onSelecParentFolder(item :FileStructure) {


    this.onSelecItem(item)
  }

  selectedItem: FileStructure | undefined
  onSelecItem(item :FileStructure) {
    this.selectedItem = item
    this.fileStructureStateService.setSelectedItem(item)
  }

  onContextMenu(event: MouseEvent, fs: FileStructure) {
    event.preventDefault()
    this.fileStructureStateService.selectedFolder = undefined
    this.popupService.toVisible(event.clientY, event.clientX, this.popuDataProducerService.forClickOnTreeViewContentItem(fs))
  }

}