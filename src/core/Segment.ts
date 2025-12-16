import { Point } from "./Point";

export class Segment {
    private length?: number

    constructor(public readonly start: Point, public readonly end: Point){
    }

    public static from(x: number, y: number): Point {
        return Point.of(x, y)
    }

    public getLength(): number {
        if (this.length === undefined){
            this.length = this.computeLength()
        }
        return this.length
    }

    public getSlope(): Slope {
        if (this.start.x <= this.end.y){
            return this.start.y < this.end.y ? 'ascending' : 'descending'
        }
         return this.start.y > this.end.y ? 'ascending' : 'descending'
    }

    private computeLength(): number{
        return Math.sqrt(
            Math.pow(this.end.x - this.start.x, 2) +
            Math.pow(this.end.y - this.start.y, 2)
        )
    }
}

export type Slope = 'ascending' | 'descending'