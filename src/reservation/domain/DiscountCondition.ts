export const enum ConditionType {
    PERIOD_CONDITION,
    SEQUENCE_CONDITION
}

export class DiscountCondition {
    private _id: number;
    private _policyId: number;
    private _conditionType: ConditionType;
    private _dayOfWeek: Date;
    private _startTime: Date;
    private _endTime: Date;
    private _sequence: number;
    constructor(id: number, policyId: number, conditionType: ConditionType, dayOfWeek: Date, startTime: Date, endTime: Date, sequence: number) {
        this._id = id;
        this._policyId = policyId;
        this._conditionType = conditionType;
        this._dayOfWeek = dayOfWeek;
        this._startTime = startTime;
        this._endTime = endTime;
        this._sequence = sequence;
    }

    public isPeriodCondition(): boolean {
        return ConditionType.PERIOD_CONDITION === this._conditionType;
    }

    public isSequenceCondition(): boolean {
        return ConditionType.SEQUENCE_CONDITION === this._conditionType;
    }

    get id(): number {
        return this._id;
    }

    get policyId(): number {
        return this._policyId;
    }

    get conditionType(): ConditionType {
        return this._conditionType;
    }

    get dayOfWeek(): Date {
        return this._dayOfWeek;
    }

    get startTime(): Date {
        return this._startTime;
    }

    get endTime(): Date {
        return this._endTime;
    }

    get sequence(): number {
        return this._sequence;
    }
}
