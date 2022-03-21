import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TextInputService } from 'src/app/services/text-input/text-input.service';
@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {

  
  constructor(
    public textInputService: TextInputService
  ) { }

  ngOnInit(): void {

  }

  onOkClick(inputValue: string) {
    if (inputValue == '') { return }
    
    this.textInputService.onInput(inputValue)
  }

  onCancelClick() {
    this.textInputService.setUnvisible()
  }

}