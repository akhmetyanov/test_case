import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FileExtension } from '../file-structure/file-structure.service';

// сервис для упраления редактора текста

@Injectable({
  providedIn: 'root'
})
export class TextEditorService {
  visible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  visible$ = this.visible.asObservable();

  data: BehaviorSubject<Text | undefined> = new BehaviorSubject<Text | undefined>(undefined)
  data$ = this.data.asObservable();

  rootUrl: string = 'https://localhost:5001/api/TextFile'

  constructor(
    private http: HttpClient
  ) { }

  openText(fileId: number) {
    this.http.get<Text>(this.rootUrl + `/${fileId}`).subscribe(f => {
      this.data.next(f)
      this.visible.next(true)
    })
  }

  saveText(text: Text) {
    this.http.post<boolean>(this.rootUrl, text).subscribe(r => {
      if (r) {
        this.visible.next(false)
      } else {
        alert('Ошибка при сохранении')
        this.visible.next(false)
      }
    })
  }

  close() {
    this.visible.next(false)
  }
}

export class Text {
  id: number = -1
  parentId?: number = -1
  name: string = ''
  extension: FileExtension = FileExtension.Text
  createdDate: Date = new Date(Date.now())
  updatedDate: Date = new Date(Date.now())
  data: string = ''
}