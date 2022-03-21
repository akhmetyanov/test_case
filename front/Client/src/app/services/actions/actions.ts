export class CreateEvent {
    name: string
    type: CreateType

    constructor(name: string, type: CreateType) {
        this.name = name
        this.type = type
    }
}

export class MoveEvent {
    downToId: number
    type: MoveType

    constructor(type: MoveType, downToID: number = -1) {
        this.type = type
        this.downToId = downToID
    }
}

export enum CreateType {
    unk,
    folder,
    text,
    point,
    line,
    polygone
}

export enum MoveType {
    unk,
    up,
    down
}