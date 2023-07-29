import { AuthRoutes } from "./auth";
import { MemberRoutes } from "./member";
import { UserTypeRoutes } from "./userType";

export class Routes {
  public authRoutes: AuthRoutes = new AuthRoutes();
  public userTypeRoutes: UserTypeRoutes = new UserTypeRoutes();
  public memberRoutes: MemberRoutes = new MemberRoutes();
}
