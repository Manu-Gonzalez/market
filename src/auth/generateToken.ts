import jwt  from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "sadasdasjgdvajdvasjdv";

interface Payload {
  id: number;
  username: string;
  email: string;
}

export const createToken = (payload: Payload): string => {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};
