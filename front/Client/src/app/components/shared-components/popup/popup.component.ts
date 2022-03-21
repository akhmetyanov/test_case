import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { PopupService } from 'src/app/services/popup/popup.service';
import { PopUpData, PopUpPosition } from 'src/app/services/popup/popup-entities';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  visible: string = 'none'
  position: PopUpPosition = new PopUpPosition()
  data: PopUpData[] = []

  constructor(
    private popUpService: PopupService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.popUpService.visible.subscribe(v => this.visible = v)
    this.popUpService.position.subscribe(p => this.position = p )
    this.popUpService.popUpData.subscribe(d => this.data = d )

    let documentMouseUp = fromEvent<MouseEvent>(this.document, 'mouseup')

    documentMouseUp.subscribe(e => {
      let el$ = e.target as HTMLElement
      let classes = ['data__item', 'popup']
      let flag: boolean = true

      el$.classList.forEach(c => {
        if (classes.includes(c)) {
          flag = !flag
        }
      })

      if (flag) {
        this.popUpService.toUnvisible()
      }

    })

  }

  onSelectItem(item: PopUpData) {
    this.popUpService.setAction(item)
  }

}
