import { Component, Input, Output, EventEmitter } from "@angular/core";
import {
    Period,
    weekDays,
    periodUnits,
    WeekDaysUtils,
    PeriodUnitsUtils,
} from "../../@core/data/period";

@Component({
    selector: "period-picker",
    templateUrl: "./period-picker.component.html",
    styleUrls: ["./period-picker.component.scss"],
})
export class PeriodPickerComponent {
    @Input() period: Period;
    @Output() periodChanged = new EventEmitter();

    weekDays = weekDays;
    periodUnits = periodUnits;

    constructor() {}

    onChange() {
        this.periodChanged.emit(this.period);
    }

    switchDay(day: number) {
        let i = this.period.days.indexOf(day);
        if (i >= 0 && this.period.days.length > 1) {
            this.period.days.splice(i, 1);
        } else {
            this.period.days.push(day);
        }
        this.onChange();
    }

    switchMode() {
        this.period.periodMode = !this.period.periodMode;
        this.onChange();
    }

    weekDayToString = WeekDaysUtils.toString;
    periodUnitToString = PeriodUnitsUtils.toString;
}
