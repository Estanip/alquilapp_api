import { CourtController } from '../controllers/court';
import { Router } from 'express';

export class CourtRoutes {
  public router: Router = Router();
  private courtController: CourtController = new CourtController();

  constructor() {
    this.router.get('/', this.courtController.getCourts);
  }
}
