import { ReservationController } from '../controllers/reservation';
import { Router } from 'express';

export class ReservationRoutes {
    public router: Router = Router();
    private reservationController: ReservationController = new ReservationController();

    constructor() {
        this.router.post('/', this.reservationController.createReservation);
    }
}
