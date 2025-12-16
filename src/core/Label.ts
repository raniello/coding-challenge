import { Box } from "./Box";
import { Point } from "./Point";

export class Label {
    constructor(public readonly point: Point, public readonly orientation: Orientation){}

    asBox(width: number, heigth: number){
        switch (this.orientation){
            case "bottom-left":
                return new Box(
                    Point.of(this.point.x-width, this.point.y), //topLeft
                    Point.of(this.point.x, this.point.y-heigth)) //bottomRight
            case "bottom-right":
                return new Box(
                    this.point, //topLeft
                    Point.of(this.point.x + width , this.point.y - heigth)) //bottomRight
            case "top-left":
                return new Box(
                    Point.of(this.point.x-width, this.point.y + heigth), //topLeft
                    this.point) //bottomRight
            case "top-right":
                  return new Box(
                    Point.of(this.point.x, this.point.y + heigth), //topLeft
                    Point.of(this.point.x + width, this.point.y)) //bottomRight
        }
    }
}

export type Orientation = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'