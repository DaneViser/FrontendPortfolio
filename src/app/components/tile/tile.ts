import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-tile',
  imports: [NgClass],
  templateUrl: './tile.html',
  styleUrls: ['./tile.scss']
})
export class TileComponent {
  @Input() row!: number;
  @Input() col!: number;
  @Input() type: 'empty' | 'start' | 'end' | 'wall' = 'empty';

  @Output() tileClicked = new EventEmitter<{ row: number; col: number }>();

  onClick() {
    this.tileClicked.emit({ row: this.row, col: this.col });
  }
}
