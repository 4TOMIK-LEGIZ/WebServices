import {Result} from "typescript-result";
import {AppNotification} from "../../../../common/application/app.notification";

export class StartedAt {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public getValue(): string {
        return this.value;
    }

    public static create(value: string): Result<AppNotification, StartedAt> {
        let notification: AppNotification = new AppNotification();
        value = (value ?? '').trim();
        if (value === '') {
            notification.addError('StartedAt is required', null);
        }
        if (notification.hasErrors()) {
            return Result.error(notification);
        }
        return Result.ok(new StartedAt(value));
    }
}