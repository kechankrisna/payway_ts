/// ## [ABAString]
/// This contains every word used in aba payment
/// ### `Example`
/// ```
/// ABAString.checkoutLabel
/// ```

export class ABAString {

    static checkoutLabel: string = "Checkout";

    static creditOrDebitCardLabel: string = "Credit/Debit Card";

    static abaPaywayLabel: string = "ABA PAYWAY";

    static scanToPayWithABAMobileLabel: string = "Scan to pay with ABA Mobile";

    static tapToPayWithABAMobileLabel: string = "Tap to pay with ABA Mobile";

    static abaPayLabel: string = "ABA PAY";

    static paymentSuccessfullyLabel: string = "payment successfully";

    static paymentProcceedSuccessfullyLabel: string =
        "Your payment was procceed successfully.";

    static moreDetailLabel: string =
        "For more detail, go to check in your account";
    static homeLabel: string = "Home";


    get checkoutLabel(): string {
        return ABAString.checkoutLabel;
    }
    get creditOrDebitCardLabel(): string {
        return ABAString.creditOrDebitCardLabel;
    }
    get abaPaywayLabel(): string {
        return ABAString.abaPaywayLabel;
    }
    get scanToPayWithABAMobileLabel(): string {
        return ABAString.scanToPayWithABAMobileLabel;
    }
    get tapToPayWithABAMobileLabel(): string {
        return ABAString.tapToPayWithABAMobileLabel;
    }
    get abaPayLabel(): string {
        return ABAString.abaPayLabel;
    }
    get paymentSuccessfullyLabel(): string {
        return ABAString.paymentSuccessfullyLabel;
    }
    get paymentProcceedSuccessfullyLabel(): string {
        return ABAString.paymentProcceedSuccessfullyLabel;
    }
    get moreDetailLabel(): string {
        return ABAString.moreDetailLabel;
    }
    get homeLabel(): string {
        return ABAString.homeLabel;
    }
}
