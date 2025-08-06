import { Request, Response } from "express";
import * as AuthService from "./service";
import { ExpressFunction } from "src/shared/types/ExpressFunctionType";
import GenericError from "@utils/GenericError";

export default class AuthController {
  public login : ExpressFunction = async (req, res, next) => {
    const { email, password, device } = req.body;
    try {
      const { accessToken, refreshToken } = await AuthService.login(email, password, device, req.ip);
      res
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, sameSite: "strict" })
        .json({ accessToken });
    } catch (error: any) {
      next(new GenericError(error.message, 401));
    }
  }

  public refresh : ExpressFunction = async (req, res, next) => {
    const { refreshToken } = req.cookies;
    const { device } = req.body;
    try {
      const { accessToken, refreshToken: newRefreshToken } = await AuthService.refreshSession(refreshToken, device);
      res
        .cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: false, sameSite: "strict" })
        .json({ accessToken });
    } catch (error: any) {
      next(new GenericError(error.message, 403));
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
