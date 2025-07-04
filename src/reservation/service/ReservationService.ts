import { Reservation } from '../domain/Reservation';
import { ScreeningDAO } from '../persistence/ScreeningDAO';
import { MovieDAO } from '../persistence/MovieDAO';
import { DiscountPolicyDAO } from '../persistence/DiscountPolicyDAO';
import { DiscountConditionDAO } from '../persistence/DiscountConditionDAO';
import { Screening } from '../domain/Screening';
import { ConditionType, DiscountCondition } from '../domain/DiscountCondition';
import { Money } from '../../generic/Money';
import { Movie } from '../domain/Movie';
import { DiscountPolicy, PolicyType } from '../domain/DiscountPolicy';
import * as console from 'node:console';

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
        this.initializeData();

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
                if (screening.isPlayedIn(condition.dayOfWeek!, condition.startTime!, condition.endTime!)) {
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
            return movie.fee.times(policy.percent!);
        }

        return Money.ZERO;
    }

    private makeReservation(customerId: number, screeningId: number, audienceCount: number, fee: Money): Reservation {
        return new Reservation(customerId, screeningId, audienceCount, fee.times(audienceCount));
    }

    private initializeData(): void {
        const movie = new Movie('한산', 150, Money.wons(10000));
        this.movieDAO.insert(movie);

        const discountPolicy = new DiscountPolicy(movie.id, PolicyType.AMOUNT_POLICY, Money.wons(1000), null);
        this.discountPolicyDAO.insert(discountPolicy);

        this.discountConditionDAO.insert(new DiscountCondition(discountPolicy.id, ConditionType.SEQUENCE_CONDITION, null, null, null, 1));
        this.discountConditionDAO.insert(new DiscountCondition(discountPolicy.id, ConditionType.SEQUENCE_CONDITION, null, null, null, 10));
        this.discountConditionDAO.insert(new DiscountCondition(discountPolicy.id, ConditionType.PERIOD_CONDITION, 1, 10, 12, null));
        this.discountConditionDAO.insert(new DiscountCondition(discountPolicy.id, ConditionType.PERIOD_CONDITION, 2, 18, 21, null));

        const screening = new Screening(movie.id, 7, new Date(2024, 12, 11, 18, 0));
        this.screeningDAO.insert(screening);

        console.log(screening.id);
    }
}
