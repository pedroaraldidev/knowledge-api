import { Request, Response } from "express";
import { BaseController } from "@core/controllers/BaseController";
import { UserService } from "@modules/users/services/UserService";

export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      this.created(res, user);
    } catch (err) {
      this.fail(res, err);
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      this.ok(res, user);
    } catch (err) {
      this.fail(res, err);
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        return this.notFound(res, "User not found");
      }
      this.ok(res, user);
    } catch (err) {
      this.fail(res, err);
    }
  }
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      this.ok(res, users);
    } catch (err) {
      this.fail(res, err);
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await this.userService.deleteUser(req.params.id);
      this.noContent(res);
    } catch (err) {
      this.fail(res, err);
    }
  }
}
