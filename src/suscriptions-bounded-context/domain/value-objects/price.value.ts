import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class Price {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public getValue(): string {
        return this.value;
    }

    public static create(value: string): Result<AppNotification, Price> {
        let notification: AppNotification = new AppNotification();
        value = (value ?? '').trim();
        if (value === '') {
            notification.addError("Price is required", null);
        }
        if (notification.hasErrors()) {
            return Result.error(notification);
        }
        return Result.ok(new Price(value));
    }
}