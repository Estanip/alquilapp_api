import express from "express";
import { loadEnv } from "../env";
import { Routes } from "./routes/index";
import returnErroResponse from "./middlewares/ErrorResponse";
import { validateToken } from "./middlewares/validateToken";
import { connection } from "./db/connection";

class App {
  public app = express();
  private routes: Routes = new Routes();

  constructor() {
    this.setEnv();
    this.setConfig();
    this.setRoutes();
    this.setResponses();
    connection();
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
  }

  private setResponses() {
    this.app.use(returnErroResponse);
  }
}

export default new App().app;
