import { Feature, Polygon } from "geojson";
import { Label } from "./Label";
import { Point } from "./Point";
import { Polyline } from "./Polyline";
import * as turf from '@turf/turf';

export class LabelPlacemetService {
    
    constructor(private labelSize = { width : 100, height: 50 }){

    }

    placeLabels(polylines: Polyline[]): Label[]{
        const labels: Label[] = []
        for (let line of polylines){
           let bestScore = Number.MAX_VALUE
           let bestLabel: Label | null = null
           for (const candidateLabel of this.getCandidateLabels(line)){
            const score = this.computeIntersectionScore(candidateLabel, polylines, labels, bestScore)
            if (score < bestScore){
                bestLabel = candidateLabel
                bestScore = score
            }
           }
           if (bestLabel)
              labels.push(bestLabel)
        }
     
        return labels
    }

    private *getCandidateLabels(line: Polyline){
        const splitPoints = Array.from(line.split(4)).sort((p2, p1) => p2.distanceFromCenter - p1.distanceFromCenter )
         for (const {point, containingSegment} of splitPoints){
            yield new Label(point, containingSegment.getSlope() === "ascending" ? "top-left" : "top-right")
            yield new Label(point, containingSegment.getSlope() === "ascending" ? "bottom-right" : "bottom-left")
         }
    }

    private computeIntersectionScore(label: Label, polylines: Polyline[], otherLabels: Label[], bestScore: number): number {
        let score = 0
        const turfLabel = this.labelAsTurfBox(label)
        for (let line of polylines){
            const turfPolyline = turf.lineString(line.points.map(point => [point.x, point.y]))
            const intersection = turf.lineIntersect(turfLabel, turfPolyline)
            score += intersection.features.length
            if (score > bestScore){
                return score
            }
        }
        for (const otherLabel of otherLabels){
            if (turf.booleanIntersects(turfLabel, this.labelAsTurfBox(otherLabel))){
                score += 10
                if (score > bestScore){
                    return score
                }
            }
        }
        return score
    }

    private  labelAsTurfBox(label: Label){
    const box = label.asBox(this.labelSize.width, this.labelSize.height)
    return turf.bboxPolygon([
            box.minX, 
            box.minY, 
            box.maxX, 
            box.maxY
        ]);
}
}

type ScoredLabel = {
    score: number
    label: Label
}