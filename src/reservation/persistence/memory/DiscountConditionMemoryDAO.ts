import { InMemoryDAO } from './InMemoryDAO';
import { DiscountCondition } from '../../domain/DiscountCondition';
import { DiscountConditionDAO } from '../DiscountConditionDAO';

export class DiscountConditionMemoryDAO extends InMemoryDAO<DiscountCondition> implements DiscountConditionDAO {
    selectDiscountConditions(policyId: number): DiscountCondition[] {
        return this.findMany(discountCondition => discountCondition.policyId === policyId);
    }
}
