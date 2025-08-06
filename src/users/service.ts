import { prisma } from "@config/prisma";
import bcrypt from "bcryptjs";
import { RegisterUserInput } from "./userSchema";

export async function registerUser(data: RegisterUserInput) {

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  });
  if (existingUser) throw new Error("El correo ya está registrado");

  const {username, email, password} = data;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword
    }
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}

export async function getAllUsers() {
  return await prisma.user.findMany({
    select: { id: true, username: true, email: true }
  });
}