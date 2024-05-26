import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss'
})
export class LeftPanelComponent {
  selectedZero = true;
  selectedOne = false;

  change(position: number) {
    if (position === 0 && this.selectedZero) {
      return;
    } else if (position === 1 && this.selectedOne) {
      return;
    } else {
      this.selectedZero = !this.selectedZero;
      this.selectedOne = !this.selectedOne;
    }
  }
}
