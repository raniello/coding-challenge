import { Segment } from "./Segment";

export class Point {
    constructor(public readonly x: number, public readonly y: number){

    }

    public to(x: number, y: number): Segment {
        return new Segment(this, new Point(x, y))
    }

    public static of(x: number, y: number){
        return new Point(x, y)
    }
}
