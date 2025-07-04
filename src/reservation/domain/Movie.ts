import { Money } from '../../generic/Money';

export class Movie {
    private _id: number;
    private _title: string;
    private _runningTime: number;
    private _fee: Money;

    constructor(id: number, title: string, runningTime: number, fee: Money) {
        this._id = id;
        this._title = title;
        this._runningTime = runningTime;
        this._fee = fee;
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get runningTime(): number {
        return this._runningTime;
    }

    get fee(): Money {
        return this._fee;
    }
}
