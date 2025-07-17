"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const Schema = {
    productBody: zod_1.z.object({
        nombre: zod_1.z.string().min(1, "El nombre es requerido").max(40, "El maximo de longitud del nombre es de 40 caracteres"),
        precio: zod_1.z.number({
            required_error: "El precio es requerido",
            invalid_type_error: "El precio debe ser un número",
        }),
    }),
    productParams: zod_1.z.object({
        id: zod_1.z.coerce.number({
            invalid_type_error: "El id debe ser un número",
        }),
    }),
    productQuery: zod_1.z.object({
        page: zod_1.z.coerce.number({
            invalid_type_error: "Debe ingresar un numero entero en el numero de pagina",
        }).min(1).optional(),
    }),
};
exports.default = Schema;
