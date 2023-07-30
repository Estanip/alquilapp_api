import { AuthRoutes } from "./auth";
import { CourtRoutes } from "./court";
import { MemberRoutes } from "./member";
import { ReservationRoutes } from "./reservation";
import { UserTypeRoutes } from "./userType";

export class Routes {
  public authRoutes: AuthRoutes = new AuthRoutes();
  public userTypeRoutes: UserTypeRoutes = new UserTypeRoutes();
  public memberRoutes: MemberRoutes = new MemberRoutes();
  public reservationRoutes: ReservationRoutes = new ReservationRoutes();
  public courtRoutes: CourtRoutes = new CourtRoutes();
}
