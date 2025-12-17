import readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';
import { Polyline } from './core/Polyline';
import { Point } from './core/Point';
import { LabelPlacemetService } from './core/LabelPlacementService';

async function main() {
  const rl = readline.createInterface({ input, output });
  const lines: string[] = [];

  for await (const line of rl) {
    if (line?.trim().length > 0){

      lines.push(line); 
    }
    else {

      break
    }
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
        const x = list.shift()!
        const y = list.shift()!
        yield new Point(x, y)
    }
}

main()