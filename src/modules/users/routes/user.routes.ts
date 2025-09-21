import { BaseRouter } from "@core/routes/BaseRoutes";
import { UserController } from "@users/controllers/UserController";
import { UserService } from "@users/services/UserService";
import { UserRepository } from "@users/repositories/UserRepository";

export class UserRouter extends BaseRouter {
  private userController: UserController;

  constructor() {
    super();
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    this.userController = new UserController(userService);
  }

  protected initRoutes(): void {
    this.router.post("/", (req, res) => this.userController.createUser(req, res));
    this.router.get("/", (req, res) => this.userController.getAllUsers(req, res));
    this.router.get("/:id", (req, res) => this.userController.getUser(req, res));
    this.router.put("/:id", (req, res) => this.userController.updateUser(req, res));
    this.router.delete("/:id", (req, res) => this.userController.deleteUser(req, res));
  }
}
