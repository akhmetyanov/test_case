import { Component, OnInit } from '@angular/core';
import { FileStructureStateService } from './services/file-structure/file-structure-state.service';
import { FileExtension, FileStructure, FileStructureService } from './services/file-structure/file-structure.service';
import { TextInputService } from './services/text-input/text-input.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';

  fileStructire: FileStructure[] | undefined
  selectedItem: FileStructure | undefined

  constructor(
    private fileStructureService: FileStructureService,
    private fileStructureStateService: FileStructureStateService,
    private textInput: TextInputService
  ) { }

  ngOnInit(): void {

    this.fileStructureStateService.fullStructure$
      .subscribe(s => {
        this.fileStructire = s
      })
  }

  onCreateRootFolder() {
    this.textInput.setLable('Введите название папки')
    this.textInput.value$.subscribe(name => {
      this.fileStructureService.createFile(name, FileExtension.Folder).subscribe(e => {
        if(e) { this.fileStructureStateService.init() }
      })
    })
  }

}
