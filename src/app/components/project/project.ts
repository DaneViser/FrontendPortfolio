import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItem } from './project-item/project-item';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectItem],
  templateUrl: './project.html',
  styleUrls: ['./project.scss']
})
export class Project {
  projects = [
    {id:1, title: 'Pathfinding Algorithm 🗺️', description: 'A project where you choose the starting and end points and let the magic happen', route: '/project/pathfinder' },
    {id:2, title: 'Test', description: 'Test', route: '/projects/salon' }
  ];
}
