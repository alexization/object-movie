export class Screening {
    private _id: number;
    private _movieId: number;
    private _sequence: number;
    private _screeningTime: Date;

    constructor(id: number, movieId: number, sequence: number, screeningTime: Date) {
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

    public isPlayedIn(dayOfWeek: Date, startTime: Date, endTime: Date): boolean {
        return (
            this._screeningTime.getDay() === dayOfWeek.getDay() &&
            this._screeningTime.getHours() >= startTime.getHours() &&
            this._screeningTime.getHours() <= endTime.getHours()
        );
    }
}
