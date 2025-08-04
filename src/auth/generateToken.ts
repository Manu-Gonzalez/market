import jwt  from "jsonwebtoken";

const tokenKey = process.env.JWT_SECRET || "sadasdasjgdvajdvasjdv";
const refreshTokenKey = process.env.REFRESH_SECRET || "sadasdasjgdvajdvasjdv";

interface Payload {
  id: number;
  username: string;
  email: string;
}

export const createToken = (payload: Payload): string => {
  return jwt.sign(payload, tokenKey, { expiresIn: "15m" });
};

export const createRefreshToken = (payload: Payload): string => {
  return jwt.sign(payload, refreshTokenKey, { expiresIn: "7d" });
};