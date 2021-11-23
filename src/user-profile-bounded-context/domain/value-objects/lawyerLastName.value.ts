import {Result} from "typescript-result";
import {AppNotification} from "../../../common/application/app.notification";

export class LawyerLastName {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public getValue(): string {
        return this.value;
    }

    public static create(value: string): Result<AppNotification, LawyerLastName> {
        let notification: AppNotification = new AppNotification();
        value = (value ?? '').trim();
        if (value === '') {
            notification.addError('Lawyer Last Name is required', null);
        }
        if (notification.hasErrors()) {
            return Result.error(notification);
        }
        return Result.ok(new LawyerLastName(value));
    }
}