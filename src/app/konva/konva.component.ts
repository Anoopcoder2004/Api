import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import Konva from 'konva';

@Component({
  selector: 'app-konva',
  standalone: true,
  imports: [],
  templateUrl: './konva.component.html',
  styleUrls: ['./konva.component.scss']
})
export class KonvaComponent implements AfterViewInit {
  @ViewChild('konvaContainer') containerRef!: ElementRef;

  stage!: Konva.Stage;
  layer!: Konva.Layer;

  ngAfterViewInit() {
    const container = this.containerRef.nativeElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Stage
    this.stage = new Konva.Stage({
      container,
      width,
      height,
    });

    // Layer
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    // Example overlay (semi-transparent polygon)
    const zonePoints = [50, 50, 150, 50, 150, 150, 50, 150]; // Example points
    const overlay = new Konva.Line({
      points: zonePoints,
      fill: 'rgba(255, 0, 0, 0.3)',
      stroke: 'red',
      strokeWidth: 2,
      closed: true,
      name: 'zone-overlay',
    });
    // Example transparent polygons
    const safeZonePoints = [50, 50, 300, 50, 300, 200, 50, 200];
    const fireZonePoints = [400, 100, 600, 100, 550, 250, 400, 200];
    this.layer.add(overlay);
    this.layer.draw();
    this.addTransPolygon(safeZonePoints, 'safe');
    this.addTransPolygon(fireZonePoints, 'fire');

    // Stage click
    this.stage.on('click', () => {
      console.log('Stage clicked!');
    });
  }

  addRectangle() {
    const rect = new Konva.Rect({
      x: Math.random() * 700,
      y: Math.random() * 500,
      width: 100,
      height: 50,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 2,
      draggable: true,
    });

    rect.on('click', (e) => {
      e.cancelBubble = true;
      rect.fill(rect.fill() === 'green' ? 'orange' : 'green');
      this.layer.draw();
    });

    this.layer.add(rect);
    this.layer.draw();
  }

  addCircle() {
    const circle = new Konva.Circle({
      x: Math.random() * 700,
      y: Math.random() * 500,
      radius: 30,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 2,
      draggable: true,
    });

    circle.on('click', (e) => {
      e.cancelBubble = true;
      alert('Circle clicked!');
    });

    this.layer.add(circle);
    this.layer.draw();
  }

  addEllipse() {
    const ellipse = new Konva.Ellipse({
      x: Math.random() * 700,
      y: Math.random() * 500,
      radiusX: 50,
      radiusY: 30,
      fill: 'blue',
      stroke: 'black',
      strokeWidth: 2,
      draggable: true,
    });

    this.layer.add(ellipse);
    this.layer.draw();
  }

  addStar() {
    const star = new Konva.Star({
      x: Math.random() * 700,
      y: Math.random() * 500,
      numPoints: 5,
      innerRadius: 20,
      outerRadius: 40,
      fill: 'yellow',
      stroke: 'black',
      strokeWidth: 2,
      draggable: true,
    });

    this.layer.add(star);
    this.layer.draw();
  }

  addPolygon() {
    const polygon = new Konva.RegularPolygon({
      x: Math.random() * 700,
      y: Math.random() * 500,
      sides: 6,
      radius: 40,
      fill: 'purple',
      stroke: 'black',
      strokeWidth: 2,
      draggable: true,
    });

    this.layer.add(polygon);
    this.layer.draw();
  }

  addText() {
    const text = new Konva.Text({
      x: Math.random() * 700,
      y: Math.random() * 500,
      text: 'Hello Konva!',
      fontSize: 24,
      fontFamily: 'Calibri',
      fill: 'black',
      draggable: true,
    });

    this.layer.add(text);
    this.layer.draw();
  }

  addLine() {
    const line = new Konva.Line({
      points: [Math.random() * 700, Math.random() * 500, Math.random() * 700, Math.random() * 500],
      stroke: 'black',
      strokeWidth: 4,
      lineCap: 'round',
      lineJoin: 'round',
      draggable: true,
    });

    this.layer.add(line);
    this.layer.draw();
  }
  addTransPolygon(points: number[], type: 'safe' | 'fire') {
    const fillColor = type === 'safe' ? 'rgba(0, 128, 255, 0.3)' : 'rgba(255, 0, 0, 0.3)';
    const strokeColor = type === 'safe' ? '#0080FF' : '#FF0000';

    const polygon = new Konva.Line({
      points: points, // [x1, y1, x2, y2, ..., xn, yn]
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: 2,
      closed: true,
      draggable: false,
      name: type + '-zone',
    });

    this.layer.add(polygon);
    this.layer.draw();

    // Optional: add a label at the centroid
    const centroid = this.getPolygonCentroid(points);
    const label = new Konva.Text({
      text: type === 'safe' ? 'Safe Zone' : 'Fire Zone',
      x: centroid.x,
      y: centroid.y,
      fontSize: 18,
      fontFamily: 'Arial',
      fill: strokeColor,
    });
    label.offsetX(label.width() / 2);
    label.offsetY(label.height() / 2);

    this.layer.add(label);
    this.layer.draw();
  }

  // Helper function for centroid
  getPolygonCentroid(points: number[]): { x: number, y: number } {
    let x = 0, y = 0;
    const len = points.length / 2;
    for (let i = 0; i < points.length; i += 2) {
      x += points[i];
      y += points[i + 1];
    }
    return { x: x / len, y: y / len };
  }
  addZone(points: number[], type: 'safe' | 'fire') {
    const fillColor = type === 'safe' ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)';
    const strokeColor = type === 'safe' ? 'green' : 'red';

    const polygon = new Konva.Line({
      points,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: 2,
      closed: true,
      draggable: true, // ✅ make it draggable
      name: type + '-zone',
    });

    // Click event
    polygon.on('click', (e) => {
      e.cancelBubble = true;
      alert(`${type.toUpperCase()} Zone clicked!`);
    });

    this.layer.add(polygon);
    this.layer.draw();
  }
  addSafeZone() {
    this.addZone([50, 50, 150, 50, 150, 150, 50, 150], 'safe');
  }

  addFireZone() {
    this.addZone([200, 200, 300, 200, 300, 300, 200, 300], 'fire');
  }


}
