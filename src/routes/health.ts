import { HealthController } from '../controllers/health';
import { Router } from 'express';

export class HealthRoutes {
  public router: Router = Router();
  private healthController: HealthController = new HealthController();

  constructor() {
    this.router.get('/', this.healthController.checkHealth);
  }
}
