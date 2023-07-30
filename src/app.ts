import express from "express";
import { loadEnv } from "../env";
import { Routes } from "./routes/index";
import returnErroResponse from "./middlewares/ErrorResponse";
import { validateToken } from "./middlewares/validateToken";
import { connection } from "./db/connection";
import { setSwaggerResponse, setSwaggerRequest } from "./utils/swagger";

class App {
  public app = express();
  private routes: Routes = new Routes();

  constructor() {
    this.setEnv();
    setSwaggerResponse(this.app);
    this.setConfig();
    this.setRoutes();
    this.setResponses();
    this.connectDb();
    setSwaggerRequest();
  }

  private setConfig() {
    this.app.use(express.json());
  }

  private setEnv() {
    loadEnv();
  }

  private setRoutes() {
    this.app.use("/auth", this.routes.authRoutes.router);

    this.app.use(validateToken);
    this.app.use("/user-type", this.routes.userTypeRoutes.router);
    this.app.use("/member", this.routes.memberRoutes.router);
    this.app.use("/reservation", this.routes.reservationRoutes.router);
    this.app.use("/court", this.routes.courtRoutes.router);
  }

  private setResponses() {
    this.app.use(returnErroResponse);
  }

  private connectDb() {
    connection();
  }
}

export default new App().app;
