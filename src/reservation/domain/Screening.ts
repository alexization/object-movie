export class Screening {
    private _id: number;
    private _movieId: number;
    private _sequence: number;
    private _screeningTime: Date;

    constructor(movieId: number, sequence: number, screeningTime: Date, id: number = 0) {
        this._id = id;
        this._movieId = movieId;
        this._sequence = sequence;
        this._screeningTime = screeningTime;
    }

    get id(): number {
        return this._id;
    }

    get movieId(): number {
        return this._movieId;
    }

    get sequence(): number {
        return this._sequence;
    }

    get screeningTime(): Date {
        return this._screeningTime;
    }

    public isPlayedIn(dayOfWeek: number, startTime: number, endTime: number): boolean {
        return this._screeningTime.getDay() === dayOfWeek && this._screeningTime.getHours() >= startTime && this._screeningTime.getHours() <= endTime;
    }
}
