import { MemberController } from '../controllers/member';
import { Router } from 'express';

export class MemberRoutes {
    public router: Router = Router();
    private memberController: MemberController = new MemberController();

    constructor() {
        this.router.get('/', this.memberController.getMembers);
        this.router.get('/filter', this.memberController.getMembersBy);
    }
}
