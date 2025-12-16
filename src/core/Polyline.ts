import { Box } from "./Box";
import { Point } from "./Point";
import { Segment } from "./Segment";

export class Polyline {

    constructor(public readonly points: ReadonlyArray<Point>){
    }

    get segments(): Segment[] {
        return Array.from(this.getSegments())
    }

    private *getSegments(){
        let previous = this.points[0]
        for (let i = 1; i < this.points.length; i ++){
            const current = this.points[i]
            yield new Segment(previous, current)
            previous = current
        }
    }

    findCenter(): [Segment, Point] {
        let residualLength = this.getLength() / 2
        for (let segment of this.segments){
            if (segment.getLength() > residualLength){
                const ratio = residualLength / segment.getLength()
                return [segment, Point.of(
                    segment.start.x + (ratio * (segment.end.x - segment.start.x)),
                    segment.start.y + (ratio * (segment.end.y - segment.start.y))
                )]
            }
            residualLength -= segment.getLength()
        }
        throw new Error("Cannot happen")
    }

    *split(segmentNumber: number): Generator<SplitPoint> {
        const totalLength = this.getLength()
        const distanceToCenter = totalLength / 2
        const distanceBetweenSplittingPoints =  totalLength / segmentNumber
        let nextSplittingPointDistance = distanceBetweenSplittingPoints
        let pointIndex = 1
        for (let segment of this.segments){
            let residualSegment = segment
            while (residualSegment.getLength() > nextSplittingPointDistance){
                const distanceFromCenter = Math.abs(
                    (pointIndex * distanceBetweenSplittingPoints) - distanceToCenter)
                const ratio = nextSplittingPointDistance / residualSegment.getLength()
                const point =  Point.of(
                    residualSegment.start.x + (ratio * (residualSegment.end.x - residualSegment.start.x)),
                    residualSegment.start.y + (ratio * (residualSegment.end.y - residualSegment.start.y)))
                yield  {
                    containingSegment: segment, 
                    point,
                    distanceFromCenter
                }
                pointIndex++
                residualSegment = new Segment(point, residualSegment.end)
                nextSplittingPointDistance = distanceBetweenSplittingPoints
            }
            nextSplittingPointDistance -= segment.getLength()
        }
    }

    getLength(): number {
        return this.segments.reduce((acc, segment) => acc + segment.getLength(), 0)
    }

    getBoundingBox(): Box {
        let minX = Number.MAX_VALUE
        let maxX = Number.MIN_VALUE
        let minY = Number.MAX_VALUE
        let maxY = Number.MIN_VALUE
        for (let point of this.points){
            minX = Math.min(minX, point.x)
            maxX = Math.max(maxX, point.x)
            minY = Math.min(minY, point.y)
            maxY = Math.max(maxY, point.y)
        }
        return new Box(Point.of(minX, maxY), Point.of(maxX, minY))
    }
}

export type SplitPoint = {
    point: Point,
    containingSegment: Segment,
    distanceFromCenter: number
}