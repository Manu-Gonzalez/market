import { z } from "zod";

export const registerUserSchema = z.object({
    username: z
        .string()
        .min(2, "El username debe tener al menos 2 caracteres")
        .max(50, "El username no puede superar los 50 caracteres")
        .trim()
        .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "El username solo puede contener letras y espacios"),

    email: z
        .string()
        .email("Correo electrónico inválido")
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(64, "La contraseña no puede superar los 64 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
        .regex(/[a-z]/, "Debe contener al menos una minúscula")
        .regex(/[0-9]/, "Debe contener al menos un número")
        .regex(/[\W_]/, "Debe contener al menos un símbolo especial"),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
    email: z
        .string()
        .email("Correo electrónico inválido")
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(64, "La contraseña no puede superar los 64 caracteres"),
});