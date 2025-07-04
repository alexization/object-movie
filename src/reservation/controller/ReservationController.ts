import { Body, Controller, Post } from '@nestjs/common';
import { ReservationService } from '../service/ReservationService';
import { ReservationScreenReq } from '../dto/ReservationDto';

@Controller('reservation')
export class ReservationController {
    private readonly reservationService: ReservationService;

    constructor(reservationService: ReservationService) {
        this.reservationService = reservationService;
    }

    @Post('screen') reserveScreening(@Body() request: ReservationScreenReq): void {
        this.reservationService.reserveScreening(request.customerId, request.screeningId, request.audienceCount);
    }
}
