import { AuthController } from '../controllers/auth';
import { Router } from 'express';

export class AuthRoutes {
  public router: Router = Router();
  private authController: AuthController = new AuthController();

  constructor() {
    this.router.post('/register', this.authController.register);
    this.router.post('/login', this.authController.login);
  }
}
