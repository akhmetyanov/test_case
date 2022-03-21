import { Component, OnInit } from '@angular/core';
import { Text, TextEditorService } from 'src/app/services/text-editor/text-editor.service';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit {
  dataToEdit: Text = new Text()
  visible: boolean = false
  constructor(
    public textEditorService: TextEditorService
  ) { }

  ngOnInit(): void {
    this.textEditorService.visible$.subscribe(v => this.visible = v)
    this.textEditorService.data$.subscribe(d => {
      if (d) { this.dataToEdit = d }
    })
  }

  onInput(event: any) {
    this.dataToEdit.data = event.target.textContent
  }

  onSave(data: string) {
    this.dataToEdit.data = data
    this.textEditorService.saveText(this.dataToEdit)
  }

  onClose() {
    this.textEditorService.close()
  }

}
