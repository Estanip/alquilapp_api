import { UserTypeController } from '../controllers/userType';
import { Router } from 'express';

export class UserTypeRoutes {
  public router: Router = Router();
  private userTypeController: UserTypeController = new UserTypeController();

  constructor() {
    this.router.post('/', this.userTypeController.createUserType);
  }
}
