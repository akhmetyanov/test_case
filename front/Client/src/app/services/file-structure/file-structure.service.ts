import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

// сервеси для работы с элементами на сервере: создать, удалить, переименовать, сохранить

@Injectable({
  providedIn: 'root'
})
export class FileStructureService {
  rootUrl: string = 'https://localhost:5001/api/FileStructure'
  constructor(
    private http: HttpClient
  ) { }

  getFileStructure() {
    return this.http.get<Array<FileStructure>>(this.rootUrl)
  }

  getParent(id: number) {
    return this.http.get<FileStructure>(this.rootUrl + '/' + id)
  }

  createFile(name: string, ex: FileExtension,  rootId: number | undefined = undefined) {
    if (rootId) {
      return this.http.put(this.rootUrl + `/${rootId}/${name}/${ex}`, '')
    } else {
      return this.http.put(this.rootUrl + `/${-1}/${name}/${ex}`, '')
    }
  }

  rename(id: number, name: string) {
    return this.http.put<boolean>(this.rootUrl + `/${id}/${name}`, '')
  }

  delete(id: number) {
    return this.http.delete<boolean>(this.rootUrl + '/' + id)
  }

}

export class FileStructure {
  id: number
  parentId?: number
  name: string
  extension: FileExtension
  children: Array<FileStructure>
  createdDate: Date
  updatedDate?: Date

  constructor(id: number, name: string, extension: FileExtension = FileExtension.Folder, parentId?: number) {
    this.id = id
    this.name = name
    this.parentId = parentId
    this.id = id
    this.extension = extension
    this.children = []
    this.createdDate = new Date(Date.now())
  }
}

export enum FileExtension {
  Folder,
  Point,
  Line,
  Polygone,
  Text
}