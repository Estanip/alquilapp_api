import { AuthRoutes } from "./auth";
import { UserTypeRoutes } from "./userType";

export class Routes {
  public authRoutes: AuthRoutes = new AuthRoutes();
  public userTypeRoutes: UserTypeRoutes = new UserTypeRoutes();
}
