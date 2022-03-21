import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PopUpData, PopUpPosition } from './popup-entities';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  visible: BehaviorSubject<string> = new BehaviorSubject<string>('none')
  visible$ = this.visible.asObservable();

  position: BehaviorSubject<PopUpPosition> = new BehaviorSubject<PopUpPosition>(new PopUpPosition())
  position$ = this.position.asObservable();

  popUpData: BehaviorSubject<PopUpData[]> = new BehaviorSubject<PopUpData[]>([])
  popUpData$ = this.popUpData.asObservable();

  action: BehaviorSubject<PopUpData | undefined> = new BehaviorSubject<PopUpData | undefined>(undefined)
  action$ = this.popUpData.asObservable();

  constructor() { }

  toVisible(top: number, left: number, data: PopUpData[]) {
    let pos = new PopUpPosition()
    pos.top = top
    pos.left = left

    this.position.next(pos)
    this.visible.next('block')

    this.popUpData.next(data)
  }

  toUnvisible() {
    this.visible.next('none')
  }

  setAction(item: PopUpData) {
    if (item.childs.length > 0) {
      this.popUpData.next(item.childs)
    } else {
      this.action.next(item)
    }
    
  }
}