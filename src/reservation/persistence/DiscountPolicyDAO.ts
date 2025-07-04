import { DiscountPolicy } from '../domain/DiscountPolicy';

export interface DiscountPolicyDAO {
    selectDiscountPolicy(movieId: number): DiscountPolicy;

    insert(discountPolicy: DiscountPolicy): void;
}
