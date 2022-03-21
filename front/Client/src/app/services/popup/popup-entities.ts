import { FileStructure } from "../file-structure/file-structure.service"

export class PopUpPosition {
    top: number = 0
    left = 0
  }
  
  export class PopUpData {
    action: Action
    lable: string
    childs: PopUpData[] = []
    structureItem: FileStructure | undefined
  
    constructor(action: Action = Action.none, lable: string = '', structureItem: FileStructure | undefined = undefined) {
      this.action = action
      this.lable = lable
      this.structureItem = structureItem
    }
  }
  
  export enum Action {
    none,
    rename,
    delete,
    createFolder,
    createRootFolder,
    createText,
    createPoint,
    createLine,
    createPolygone,
  }