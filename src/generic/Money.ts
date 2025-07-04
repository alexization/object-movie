export class Money {
    private static readonly _ZERO: Money = Money.wons(0);

    private readonly _amount: number;

    constructor(amount: number) {
        this._amount = amount;
    }

    static wons(amount: number): Money {
        return new Money(amount);
    }

    plus(amount: Money): Money {
        return new Money(this._amount + amount._amount);
    }

    minus(amount: Money) {
        return new Money(this._amount - amount._amount);
    }

    times(percent: number) {
        return new Money(this._amount * percent);
    }

    get amount(): number {
        return this._amount;
    }

    static get ZERO(): Money {
        return this._ZERO;
    }
}
