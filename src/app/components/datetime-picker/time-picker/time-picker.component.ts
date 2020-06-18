import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Time } from "@angular/common";

@Component({
    selector: "time-picker",
    templateUrl: "./time-picker.component.html",
    styleUrls: ["./time-picker.component.scss"],
})
export class TimePickerComponent {
    @Input() time: Time;
    @Output() timeChange = new EventEmitter();
    @Output() change = new EventEmitter();

    onChange() {
        this.timeChange.emit(this.time);
        this.change.emit();
    }
}
