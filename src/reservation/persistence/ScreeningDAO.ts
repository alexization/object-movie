import { Screening } from '../domain/Screening';

export interface ScreeningDAO {
    selectScreening(screeningId: number): Screening;

    insert(screening: Screening): void;
}
