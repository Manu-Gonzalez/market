import { Response, Request, NextFunction } from "express";

export const generateCookies = (accessToken: string, refreshToken: string) => (req: Request, res: Response, next: NextFunction) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 15
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  next();
};
