import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-about',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

}
