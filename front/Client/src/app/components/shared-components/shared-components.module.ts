import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './popup/popup.component';
import { PopupDataComponent } from './popup/popup-data/popup-data.component';
import { TextInputComponent } from './text-input/text-input.component';
import { TextEditorComponent } from './text-editor/text-editor.component';



@NgModule({
  declarations: [
    PopupComponent,
    PopupDataComponent,
    TextInputComponent,
    TextEditorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PopupComponent, TextInputComponent, TextEditorComponent
  ]
})
export class SharedComponentsModule { }
