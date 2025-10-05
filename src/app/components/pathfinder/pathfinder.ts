import { Component, OnInit } from '@angular/core';
import { TileComponent } from '../tile/tile';

interface Tile {
  row: number;
  col: number;
  type: 'empty' | 'start' | 'end' | 'wall';
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

  private startSet = false;
  private endSet = false;

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
}
