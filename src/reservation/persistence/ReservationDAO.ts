import { Reservation } from '../domain/Reservation';

export interface ReservationDAO {
    insert(reservation: Reservation): void;
}
