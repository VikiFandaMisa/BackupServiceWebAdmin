import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Time } from "@angular/common";

@Component({
    selector: "datetimepicker",
    templateUrl: "./datetimepicker.component.html",
    styleUrls: ["./datetimepicker.component.scss"],
})
export class DatetimepickerComponent {
    @Input() datetime: Date;
    @Output() datetimeChange = new EventEmitter();
    @Output() change = new EventEmitter();

    get time(): Time {
        return {
            hours: this.datetime.getHours(),
            minutes: this.datetime.getMinutes(),
        };
    }
    set time(value: Time) {
        this.datetime.setHours(value.hours, value.minutes);
        this.onChange();
    }

    get date(): Date {
        return this.datetime;
    }
    set date(value: Date) {
        this.datetime.setMonth(value.getMonth(), value.getDate());
        this.onChange();
    }

    onChange() {
        this.datetimeChange.emit(this.datetime);
        this.change.emit();
    }
}
