export const enum ConditionType {
    PERIOD_CONDITION,
    SEQUENCE_CONDITION
}

export class DiscountCondition {
    private _id: number;
    private _policyId: number;
    private _conditionType: ConditionType;
    private _dayOfWeek: number | null;
    private _startTime: number | null;
    private _endTime: number | null;
    private _sequence: number | null;
    constructor(
        policyId: number,
        conditionType: ConditionType,
        dayOfWeek: number | null,
        startTime: number | null,
        endTime: number | null,
        sequence: number | null,
        id: number = 0
    ) {
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

    get dayOfWeek(): number | null {
        return this._dayOfWeek;
    }

    get startTime(): number | null {
        return this._startTime;
    }

    get endTime(): number | null {
        return this._endTime;
    }

    get sequence(): number | null {
        return this._sequence;
    }
}
