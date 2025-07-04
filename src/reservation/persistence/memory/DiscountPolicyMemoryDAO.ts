import { InMemoryDAO } from './InMemoryDAO';
import { DiscountPolicy } from '../../domain/DiscountPolicy';
import { DiscountPolicyDAO } from '../DiscountPolicyDAO';

export class DiscountPolicyMemoryDAO extends InMemoryDAO<DiscountPolicy> implements DiscountPolicyDAO {
    selectDiscountPolicy(movieId: number): DiscountPolicy {
        const result = this.findOne(discountPolicy => discountPolicy.movieId === movieId);

        if (!result) {
            throw new Error(`Could not find discount policy with id ${movieId}`);
        }

        return result;
    }
}
