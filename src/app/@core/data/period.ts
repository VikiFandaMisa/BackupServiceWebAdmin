import { Time } from "@angular/common";

export const periodUnits = [1, 2, 3, 4];
export const weekDays = [0, 1, 2, 3, 4, 5, 6];

export namespace PeriodUnitsUtils {
    export function toString(unit: number): string {
        switch (unit) {
            case 1:
                return "minutes";
            case 2:
                return "hours";
            case 3:
                return "days";
            case 4:
                return "months";
        }
    }
}

export namespace WeekDaysUtils {
    export function toString(day: number): string {
        switch (day) {
            case 0:
                return "sun";
            case 1:
                return "mon";
            case 2:
                return "tue";
            case 3:
                return "wed";
            case 4:
                return "thu";
            case 5:
                return "fri";
            case 6:
                return "sat";
        }
    }
}

export class Period {
    periodMode: boolean;
    unit: number;
    value: number;
    days: number[];
    time: Time;
}
