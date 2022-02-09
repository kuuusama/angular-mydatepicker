import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IMyDate } from '../../interfaces/my-date.interface';
import { IMyTime } from '../../interfaces/my-time.interface';
import { SELECTED_DATE } from "../../constants/constants";

@Component({
  selector: 'lib-time-view',
  templateUrl: './time-view.component.html',
  styleUrls: ['./time-view.component.css']
})
export class TimeViewComponent implements OnInit, OnChanges {
  mMins: number = 0;
  mHours: number = 0;

  hoursUp() {
    if (this.mHours < 23) {
      this.mHours++;
    } else {
      this.mHours = 0;
    }
    this.onTimeChanged();
  }

  hoursDown() {
    if (this.mHours > 0) {
      this.mHours--;
    } else {
      this.mHours = 23;
    }
    this.onTimeChanged();
  }

  minsUp() {
    if (this.mMins < 59) {
      this.mMins++;
    } else {
      this.mMins = 0;
    }
    this.onTimeChanged();
  }

  minsDown() {
    if (this.mMins > 0) {
      this.mMins--;
    } else {
      this.mMins = 59;
    }
    this.onTimeChanged();
  }

  @Input() selectedDate: IMyDate;
  @Output() timeChanged: EventEmitter<IMyTime> = new EventEmitter<IMyTime>();
  
  onTimeChanged() {
    this.timeChanged.emit({hours: this.mHours, min: this.mMins});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty(SELECTED_DATE)) {
      this.selectedDate = changes[SELECTED_DATE].currentValue;
      console.log("this.selectedDate");
      console.log(this.selectedDate);
      this.mHours = this.selectedDate.hour ? this.selectedDate.hour : 0;
      this.mMins = this.selectedDate.min ? this.selectedDate.min : 0;
    }
  }



  constructor() { }

  ngOnInit() {
  }

}
