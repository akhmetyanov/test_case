import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// сервис для упраления компонентом ввода текста

@Injectable({
  providedIn: 'root'
})
export class TextInputService {
  value: Subject<string> = new Subject<string>()
  value$ = this.value.asObservable();

  lable: string = ''
  visible: boolean = false

  constructor() { }

  setLable(text: string) {
    this.lable = text
    this.visible = true
  }

  onInput(value: string) {
    this.value.next(value)
    this.setUnvisible()
  }

  setUnvisible() {
    this.visible = false
  }

  dispose() {
    this.value.complete()
    
    this.value = new Subject<string>()
    this.value$ = this.value.asObservable();
  }

}
