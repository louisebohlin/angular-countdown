import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AppDisplayComponent } from '../app-display-component/app-display-component'
import { calculateRemainingTime } from '../utils/timeUtil'

@Component({
  selector: 'app-logic-component',
  template: `
    <div>
      <app-display-component
        [eventName]="eventName"
        [remainingTime]="remainingTime"
        [isCountdownActive]="isCountdownActive"
      >
      </app-display-component>
      <div class="input-wrapper">
        <fieldset>
          <legend>Title</legend>
          <input
            type="text"
            [(ngModel)]="eventName"
            placeholder="Enter event name"
            (ngModelChange)="onInputChange()"
          />
        </fieldset>
        <fieldset>
          <legend>Date</legend>
          <input
            type="date"
            [(ngModel)]="eventDate"
            (ngModelChange)="onInputChange()"
          />
        </fieldset>
      </div>
    </div>
  `,
  standalone: true,
  styleUrls: ['./app-logic-component.scss'],
  imports: [FormsModule, AppDisplayComponent],
})
export class AppLogicComponent implements OnInit {
  eventName: string = ''
  eventDate: string = ''
  remainingTime: string = ''
  isCountdownActive: boolean = false

  private countdownInterval: any

  ngOnInit() {
    const savedEventName = localStorage.getItem('eventName')
    const savedEventDate = localStorage.getItem('eventDate')

    if (savedEventName && savedEventDate) {
      this.eventName = savedEventName
      this.eventDate = savedEventDate
      this.resetCountdown() // Restart the countdown using saved values
    }
  }

  onInputChange() {
    if (this.eventName && this.eventDate) {
      localStorage.setItem('eventName', this.eventName)
      localStorage.setItem('eventDate', this.eventDate)
      this.resetCountdown()
    }
  }

  private resetCountdown() {
    this.isCountdownActive = false
    this.remainingTime = ''

    if (this.countdownInterval) {
      clearInterval(this.countdownInterval)
    }

    this.startCountdown()
  }

  private startCountdown() {
    const countdownDate = new Date(this.eventDate).setHours(0, 0, 0, 0)
    this.isCountdownActive = true

    this.countdownInterval = setInterval(() => {
      const now = new Date().getTime()
      const timeDifference = countdownDate - now

      if (timeDifference < 0) {
        this.remainingTime = 'Countdown finished'
        this.isCountdownActive = false
        clearInterval(this.countdownInterval)
        localStorage.removeItem('eventName')
        localStorage.removeItem('eventDate')
      } else {
        this.remainingTime = calculateRemainingTime(timeDifference)
      }
    }, 1000)
  }
}
