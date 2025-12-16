import { describe, it, expect } from 'vitest';
import { LabelPlacemetService as LabelPlacementService } from './core/LabelPlacementService';
import { Polyline } from './core/Polyline';
import { Label } from './core/Label';
import { Point } from './core/Point';

describe('Label Placement Service', () => {

    const service = new LabelPlacementService()

    it('single straith ascending polyline', () => {
        const line = new Polyline([Point.of(0, 0), Point.of(100, 100)])
        const labels = service.placeLabels([line])
        expect(labels).toEqual([
            new Label(Point.of(50, 50), 'top-left')
        ]);
    });

    it('single straith descending polyline', () => {
        const line = new Polyline([Point.of(0, 100), Point.of(100, 0)])
        const labels = service.placeLabels([line])
        expect(labels).toEqual([
            new Label(Point.of(50, 50), 'top-right')
        ]);
    });

    it('two crossing polylines', () => {
        const line1 = new Polyline([Point.of(0, 0), Point.of(100, 100)])
        const line2 = new Polyline([Point.of(0, 100), Point.of(100, 0)])
        const labels = service.placeLabels([line1, line2])
        expect(labels).toEqual([
            new Label(Point.of(25, 25), 'top-left'),
            new Label(Point.of(75, 25), 'top-right')
        ]);
    });
});