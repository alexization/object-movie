import { Module } from '@nestjs/common';
import { ReservationController } from './reservation/controller/ReservationController';
import { ReservationService } from './reservation/service/ReservationService';

@Module({
    imports: [],
    controllers: [ReservationController],
    providers: [ReservationService]
})
export class AppModule {}
