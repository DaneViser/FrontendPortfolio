import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './project-item.html',
  styleUrls: ['./project-item.scss']
})
export class ProjectItem {
  @Input() title!: string;
  @Input() description!: string;
  @Input() route!: string; // where it should navigate
}
