import { Router } from "express";

export abstract class BaseRouter {
  protected router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  }

  protected abstract initRoutes(): void;

  public getRouter(): Router {
    return this.router;
  }
}
