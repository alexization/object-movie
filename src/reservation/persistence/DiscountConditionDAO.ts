import { DiscountCondition } from '../domain/DiscountCondition';

export interface DiscountConditionDAO {
    selectDiscountConditions(policyId: number): DiscountCondition[];
}
