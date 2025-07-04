import { Reservation } from '../domain/Reservation';
import { ScreeningDAO } from '../persistence/ScreeningDAO';
import { MovieDAO } from '../persistence/MovieDAO';
import { DiscountPolicyDAO } from '../persistence/DiscountPolicyDAO';
import { DiscountConditionDAO } from '../persistence/DiscountConditionDAO';
import { Screening } from '../domain/Screening';
import { DiscountCondition } from '../domain/DiscountCondition';
import { Money } from '../../generic/Money';
import { Movie } from '../domain/Movie';
import { DiscountPolicy } from '../domain/DiscountPolicy';

export class ReservationService {
    private screeningDAO: ScreeningDAO;
    private movieDAO: MovieDAO;
    private discountPolicyDAO: DiscountPolicyDAO;
    private discountConditionDAO: DiscountConditionDAO;

    constructor(screeningDAO: ScreeningDAO, movieDAO: MovieDAO, discountPolicyDAO: DiscountPolicyDAO, discountConditionDAO: DiscountConditionDAO) {
        this.screeningDAO = screeningDAO;
        this.movieDAO = movieDAO;
        this.discountPolicyDAO = discountPolicyDAO;
        this.discountConditionDAO = discountConditionDAO;
    }

    reserveScreening(customerId: number, screeningId: number, audienceCount: number): Reservation {
        const screening = this.screeningDAO.selectScreening(screeningId);
        const movie = this.movieDAO.selectMovie(screening.movieId);
        const policy = this.discountPolicyDAO.selectDiscountPolicy(movie.id);
        const conditions = this.discountConditionDAO.selectDiscountConditions(policy.id);

        const condition = this.findDiscountCondition(screening, conditions);

        let fee: Money;
        if (condition != null) {
            fee = movie.fee.minus(this.calculateDiscount(policy, movie));
        } else {
            fee = movie.fee;
        }

        return this.makeReservation(customerId, screeningId, audienceCount, fee);
    }

    private findDiscountCondition(screening: Screening, conditions: DiscountCondition[]): DiscountCondition | null {
        conditions.forEach(condition => {
            if (condition.isPeriodCondition()) {
                if (screening.isPlayedIn(condition.dayOfWeek, condition.startTime, condition.endTime)) {
                    return condition;
                }
            } else {
                if (condition.sequence === screening.sequence) {
                    return condition;
                }
            }
        });
        return null;
    }

    private calculateDiscount(policy: DiscountPolicy, movie: Movie): Money {
        if (policy.isAmountPolicy()) {
            return policy.amount;
        } else if (policy.isPercentPolicy()) {
            return movie.fee.times(policy.percent);
        }

        return Money.ZERO;
    }

    private makeReservation(customerId: number, screeningId: number, audienceCount: number, fee: Money): Reservation {
        return new Reservation(customerId, screeningId, audienceCount, fee.times(audienceCount));
    }
}
