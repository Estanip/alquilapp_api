import express from "express";
import { loadEnv } from "../env";

class App {
  public app = express();

  constructor() {
    this.setEnv();
    this.setConfig();
  }

  private setConfig() {
    this.app.use(express.json());
  }

  private setEnv() {
    loadEnv();
  }

  private setRoutes() {}
}

export default new App().app;
