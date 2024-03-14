import { Component } from '@angular/core';
import { Tile } from '../../models/tile';
@Component({
  selector: 'app-code-alerts-main',
  templateUrl: './code-alerts-main.component.html',
  styleUrls: ['./code-alerts-main.component.css']
})
export class CodeAlertsMainComponent {
  tiles: Tile[] = [
    {text: '', cols: 2, rows: 1, color: 'white'},
    {text: 'Two', cols: 2, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
  ];
}
