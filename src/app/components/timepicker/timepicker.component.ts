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

    change() {
        console.log(this.time);
        this.timeChange.emit(this.time);
    }
}
