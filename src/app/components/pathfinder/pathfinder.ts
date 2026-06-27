import { Component, OnInit } from '@angular/core';
import { TileComponent } from '../tile/tile';

interface Tile {
  row: number;
  col: number;
  type: 'empty' | 'start' | 'end' | 'wall' | 'visited' | 'path';
}

@Component({
  selector: 'app-pathfinder',
  imports: [TileComponent],
  templateUrl: './pathfinder.html',
  styleUrls: ['./pathfinder.scss']
})
export class Pathfinder implements OnInit {
  grid: Tile[][] = [];
  rows = 15;
  cols = 25;

  start: { row: number, col: number } | undefined;
  end: { row: number, col: number } | undefined;

  private startSet = false;
  private endSet = false;
  private isRunning = false;
  isMouseDown = false;
  wallMode = true; // true: draw walls, false: erase walls

  ngOnInit(): void {
    this.generateGrid();
  }

  generateGrid() {
    this.grid = [];
    for (let r = 0; r < this.rows; r++) {
      const row: Tile[] = [];
      for (let c = 0; c < this.cols; c++) {
        row.push({ row: r, col: c, type: 'empty' });
      }
      this.grid.push(row);
    }
  }

  handleTileClick(row: number, col: number) {
    if (this.isRunning) return;

    const tile = this.grid[row][col];

    if(tile.type === 'start') {
      tile.type = 'empty';
      this.startSet = false;
      return;
    }

    if(tile.type === 'end') {
      tile.type = 'empty';
      this.endSet = false;
      return;
    }

    if (!this.startSet) {
      tile.type = 'start';
      this.startSet = true;
    } else if (!this.endSet) {
      tile.type = 'end';
      this.endSet = true;
    } else {
      tile.type = tile.type === 'wall' ? 'empty' : 'wall';
    }
  }

  async bfs() {
    if (this.isRunning) return;
    this.isRunning = true;

    this.start = this.findTile('start');
    this.end = this.findTile('end');

    if (!this.start || !this.end) {
      alert('Please set both start and end points.');
      this.isRunning = false;
      return;
    }

    const queue: { row: number, col: number, path: { row: number, col: number }[] }[] = [
      { row: this.start.row, col: this.start.col, path: [] }
    ];
    const visited = new Set<string>();
    visited.add(`${this.start.row},${this.start.col}`);

    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) continue;

      const { row, col, path } = current;

      // Don't color start or end tiles as visited
      if (
        !(row === this.start.row && col === this.start.col) &&
        !(row === this.end.row && col === this.end.col)
      ) {
        this.grid[row][col].type = 'visited';
        this.grid = [...this.grid];
        await this.delay(3);
      }

      if (row === this.end.row && col === this.end.col) {
        await this.reconstructPath(path, this.end);
        this.isRunning = false;
        this.grid = [...this.grid];
        return;
      }

      const neighbors = this.getNeighbors(row, col);
      for (const neighbor of neighbors) {
        const key = `${neighbor.row},${neighbor.col}`;
        if (!visited.has(key) && this.grid[neighbor.row][neighbor.col].type !== 'wall') {
          visited.add(key);
          queue.push({ row: neighbor.row, col: neighbor.col, path: [...path, { row, col }] });
        }
      }
    }

    alert('No path found!');
    this.isRunning = false;
    this.startSet = false;
    this.endSet = false;
    this.grid = [...this.grid];
  }

  findTile(type: 'start' | 'end'): { row: number, col: number } | undefined {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.grid[r][c].type === type) {
          return { row: r, col: c };
        }
      }
    }
    return undefined;
  }

  getNeighbors(row: number, col: number): { row: number, col: number }[] {
    const neighbors = [];
    if (row > 0) neighbors.push({ row: row - 1, col });
    if (row < this.rows - 1) neighbors.push({ row: row + 1, col });
    if (col > 0) neighbors.push({ row, col: col - 1 });
    if (col < this.cols - 1) neighbors.push({ row, col: col + 1 });
    return neighbors;
  }

  async reconstructPath(path: { row: number, col: number }[], end: { row: number, col: number }) {
    let current = end;
    while (path.length > 0) {
      const previous = path.pop();
      if (previous) {
        // Don't color start or end tiles as path
        if (
          (previous.row !== this.start?.row || previous.col !== this.start?.col) &&
          (previous.row !== this.end?.row || previous.col !== this.end?.col)
        ) {
          this.grid[previous.row][previous.col].type = 'path';
          this.grid = [...this.grid];
          await this.delay(30);
        }
        current = previous;
      }
    }
  }

  resetGrid() {
    if (this.isRunning) return;

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.grid[r][c].type = 'empty';
      }
    }
    this.startSet = false;
    this.endSet = false;
    this.grid = [...this.grid]; // Trigger change detection
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onMouseDown() {
  this.isMouseDown = true;
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  onTileMouseEnter(row: number, col: number) {
    if (this.isMouseDown && !this.isRunning) {
      const tile = this.grid[row][col];
      if (tile.type !== 'start' && tile.type !== 'end') {
        tile.type = this.wallMode ? 'wall' : 'empty';
        this.grid = [...this.grid];
      }
    }
}
}
