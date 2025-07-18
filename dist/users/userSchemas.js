"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const Schema = {
    userBodySchema: zod_1.z.object({
        username: zod_1.z.string().min(1, "El nombre de usuario es requerido"),
        email: zod_1.z.string().min(1, { message: "no cumple con el minimo de caracteres (1) antes del @ (arroba)" })
            .email("El email ingresado no es valido"),
        password: zod_1.z.string().min(8, "La contraseña debe contener 8 caracteres minimo"),
    }),
    userLoginSchema: zod_1.z.object({
        username: zod_1.z.string().min(1, "El nombre de usuario es requerido"),
        password: zod_1.z.string().min(8, "La contraseña debe contener 8 caracteres minimo"),
    }),
    userParamsSchema: zod_1.z.object({
        id: zod_1.z.coerce.number({
            invalid_type_error: "El id debe ser un número",
        }),
    }),
    userQuerySchema: zod_1.z.object({
        page: zod_1.z.coerce.number({
            invalid_type_error: "Debe ingresar un numero entero en el numero de pagina",
        }).min(1).optional(),
    }),
};
exports.default = Schema;
