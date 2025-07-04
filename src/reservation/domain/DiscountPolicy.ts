import { Money } from '../../generic/Money';

export const enum PolicyType {
    PERCENT_POLICY,
    AMOUNT_POLICY
}

export class DiscountPolicy {
    private _id: number;
    private _movieId: number;
    private _policyType: PolicyType;
    private _amount: Money;
    private _percent: number;

    constructor(id: number, movieId: number, policyType: PolicyType, amount: Money, percent: number) {
        this._id = id;
        this._movieId = movieId;
        this._policyType = policyType;
        this._amount = amount;
        this._percent = percent;
    }

    public isAmountPolicy(): boolean {
        return PolicyType.AMOUNT_POLICY === this._policyType;
    }

    public isPercentPolicy(): boolean {
        return PolicyType.PERCENT_POLICY === this._policyType;
    }

    get id(): number {
        return this._id;
    }

    get movieId(): number {
        return this._movieId;
    }

    get policyType(): PolicyType {
        return this._policyType;
    }

    get amount(): Money {
        return this._amount;
    }

    get percent(): number {
        return this._percent;
    }
}
