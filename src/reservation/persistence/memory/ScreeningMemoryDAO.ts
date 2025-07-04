import { InMemoryDAO } from './InMemoryDAO';
import { Screening } from '../../domain/Screening';
import { ScreeningDAO } from '../ScreeningDAO';

export class ScreeningMemoryDAO extends InMemoryDAO<Screening> implements ScreeningDAO {
    selectScreening(screeningId: number): Screening {
        const result = this.findOne(screening => screening.id === screeningId);

        if (!result) {
            throw new Error(`Screening with id ${screeningId} not found`);
        }

        return result;
    }
}
