import { Money } from '../../generic/Money';

export class Reservation {
    private _id: number;
    private _customerId: number;
    private _screeningId: number;
    private _audienceCount: number;
    private _fee: Money;

    constructor(customerId: number, screeningId: number, audienceCount: number, fee: Money, id: number = 0) {
        this._id = id;
        this._customerId = customerId;
        this._screeningId = screeningId;
        this._audienceCount = audienceCount;
        this._fee = fee;
    }

    get id(): number {
        return this._id;
    }

    get customerId(): number {
        return this._customerId;
    }

    get screeningId(): number {
        return this._screeningId;
    }

    get audienceCount(): number {
        return this._audienceCount;
    }

    get fee(): Money {
        return this._fee;
    }
}
