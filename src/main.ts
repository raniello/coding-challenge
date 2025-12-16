import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';
import { Polyline } from './core/Polyline.js';
import { Point } from './core/Point.js';
import { LabelPlacemetService } from './core/LabelPlacementService.js';

async function main() {
  const rl = readline.createInterface({ input, output });
  const lines: string[] = [];

  for await (const line of rl) {
    lines.push(line); 
  }

  rl.close()

  const polylines = lines
  .map(line => line.split(" ").map(n => Number(n)))
  .map(listOfNumbers => new Polyline(Array.from(makePoints(listOfNumbers))))

  const service = new LabelPlacemetService()

  for (const label of service.placeLabels(polylines)){
    console.log(`${label.point.x} ${label.point.y} ${label.orientation} `)
  }
  
}

function *makePoints(list: number[]): Generator<Point> {
    while (list.length > 0){
        const x = list.unshift()
        const y = list.unshift()
        yield new Point(x, y)
    }
}

main()