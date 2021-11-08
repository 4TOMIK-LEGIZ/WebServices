import {Result} from "typescript-result";
import {AppNotification} from "../../shared/application/app.notification";

export class Price {
    private value: number;

    private constructor(value: number) {
        this.value = value;
    }

    public getValue(): number {
        return this.value;
    }

    public static create(price: number): Result<AppNotification, Price> {
        let notification: AppNotification = new AppNotification();
        let p = price.toString();
        p = (p ?? "").trim();
        if (p === "") {
            notification.addError("Price is required", null);
        }
        if (notification.hasErrors()) {
            return Result.error(notification);
        }
        return Result.ok(new Price(price));
    }
}