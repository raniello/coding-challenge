import { Point } from "./Point";

export class Box {
    constructor(public readonly topLeft: Point, public readonly bottomRight: Point){

    }
    get minX(): number {
        return  this.topLeft.x
    }
    get minY(): number {
        return this.bottomRight.y
    }
    get maxX(): number {
        return this.bottomRight.x
    }
    get maxY(): number {
        return this.topLeft.y
    }
}