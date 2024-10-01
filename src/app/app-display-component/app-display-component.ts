import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-display-component',
  standalone: true,
  template: `
    <div class="countdown-wrapper">
      <div class="countdown-header" *ngIf="remainingTime">
        <h1>Time to {{ eventName }}</h1>
        <h2>{{ remainingTime }}</h2>
      </div>
    </div>
  `,
  styleUrls: ['./app-display-component.scss'],
  imports: [CommonModule],
})
export class AppDisplayComponent {
  @Input() eventName: string = ''
  @Input() remainingTime: string = ''
  @Input() isCountdownActive: boolean = false
  @Input() eventDate: string = ''
}
