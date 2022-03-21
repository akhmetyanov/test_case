import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PopUpData } from 'src/app/services/popup/popup-entities';

@Component({
  selector: 'app-popup-data',
  templateUrl: './popup-data.component.html',
  styleUrls: ['./popup-data.component.scss']
})
export class PopupDataComponent implements OnInit {
  
  @Input() data: PopUpData[] = []
  @Output() selected = new EventEmitter<PopUpData>()
  
  constructor() { }

  ngOnInit(): void {
  }

  onSelectItem(item: PopUpData) {
    this.selected.emit(item)
  }

}
