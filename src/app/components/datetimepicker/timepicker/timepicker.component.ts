import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Time } from "@angular/common";

@Component({
    selector: "timepicker",
    templateUrl: "./timepicker.component.html",
    styleUrls: ["./timepicker.component.scss"],
})
export class TimepickerComponent {
    @Input() time: Time;
    @Output() timeChange = new EventEmitter();
    @Output() change = new EventEmitter();

    onChange() {
        this.timeChange.emit(this.time);
        this.change.emit();
    }
}
