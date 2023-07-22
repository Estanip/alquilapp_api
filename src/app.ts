import express from "express";
import { loadEnv } from "../env";
import { Routes } from "./routes/index";
import returnErroResponse from "./middlewares/ErrorResponse";
class App {
  public app = express();
  private routes: Routes = new Routes();

  constructor() {
    this.setEnv();
    this.setConfig();
    this.setRoutes();
    this.setResponses();
  }

  private setConfig() {
    this.app.use(express.json());
  }

  private setEnv() {
    loadEnv();
  }

  private setRoutes() {
    this.app.use("/auth", this.routes.authRoutes.router);
  }

  private setResponses() {
    this.app.use(returnErroResponse);
  }
}

export default new App().app;
