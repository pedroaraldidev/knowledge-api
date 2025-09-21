import { Response } from "express";
import { AppError } from "@core/errors/AppError";

export abstract class BaseController {
  protected ok<T>(res: Response, dto?: T) {
    if (dto) {
      res.status(200).json(dto);
    } else {
      res.sendStatus(200);
    }
  }

  protected created<T>(res: Response, dto: T) {
    if (dto) {
      res.status(201).json(dto);
    } else {
      res.sendStatus(201);
    }
  }

  protected noContent(res: Response) {
    res.sendStatus(204);
  }

  protected badRequest(res: Response, message?: string) {
    res.status(400).json({ message: message || "Bad Request" });
  }

  protected notFound(res: Response, message?: string) {
    res.status(404).json({ message: message || "Not Found" });
  }

  protected unauthorized(res: Response, message?: string) {
    res.status(401).json({ message: message || "Unauthorized" });
  }

  protected fail(res: Response, error: unknown) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else if (error instanceof Error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
