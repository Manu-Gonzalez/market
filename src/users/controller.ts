import * as UsuarioService from "./service";
import { registerUserSchema } from "./userSchema";
import { ExpressFunction } from "src/shared/types/ExpressFunctionType";
import GenericError from "@utils/GenericError";

export default class UsuarioController {
  public register: ExpressFunction = async (req, res, next) => {
    try {
      const validatedData = registerUserSchema.parse(req.body);

      const newUser = await UsuarioService.registerUser(validatedData);
      res.status(201).json(newUser);

    } catch (error: any) {

      if (error.name === "ZodError") {
        next(new GenericError(error.errors.map((e: any) => e.message).join(", "), 400));
      } else {
        next(new GenericError(error.message, 400));
      }

    }
  };

  public getAll: ExpressFunction = async (req, res, next) => {
    try {
      const users = await UsuarioService.getAllUsers();
      res.json(users);
    } catch (error: any) {
      next(new GenericError(error.message, 500));
    }
  };
}
