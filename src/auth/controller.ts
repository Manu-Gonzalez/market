import { Request, Response } from "express";
import * as AuthService from "./service";
import { ExpressFunction } from "src/shared/types/ExpressFunctionType";
import GenericError from "@utils/GenericError";

export default class AuthController {
  public login : ExpressFunction = async (req, res, next) => {
    const device  = req.headers["user-agent"];
    if (!device) {
      return next(new GenericError("Falta el header 'user-agent'", 400));
    }
    const { email, password} = req.body;
    try {
      const { accessToken, refreshToken } = await AuthService.login(email, password, device, req.ip);
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .json({ accessToken });
    } catch (error: any) {
      next(new GenericError(error.message, 401));
    }
  }

  public refresh : ExpressFunction = async (req, res, next) => {
    const { refreshTokensSession } = req.cookies;
    const device  = req.headers["user-agent"];

    if (!refreshTokensSession || !device) {
      return next(new GenericError("Refresh token o dispositivo no proporcionados", 400));
    }

    try {
      const { accessToken, refreshToken } = await AuthService.refreshSession(refreshTokensSession, device);
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .json({ accessToken });
    } catch (error: any) {
      next(new GenericError("", 403));
    }
  }

  public logout : ExpressFunction = async (req, res, next) => {
    const { refreshToken } = req.cookies;
    try {
      await AuthService.logout(refreshToken);
      res.clearCookie("refreshToken").json({ message: "Sesión cerrada" });
    } catch (error: any) {
        next(new GenericError(error.message, 500));
    }
  }
}
