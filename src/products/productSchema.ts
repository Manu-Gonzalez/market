import { z } from "zod";

const Schema = {
    productBody : z.object({
    nombre: z.string().min(1, "El nombre es requerido").max(40, "El maximo de longitud del nombre es de 40 caracteres"),
    precio: z.number({
        required_error: "El precio es requerido",
        invalid_type_error: "El precio debe ser un número",
        
    }),
    }),

    productParams : z.object({
    id: z.coerce.number({
        invalid_type_error: "El id debe ser un número",
    }),
    }),

    productQuery : z.object({
    page: z.coerce.number({
        invalid_type_error: "Debe ingresar un numero entero en el numero de pagina",
    }).min(1).optional(),
    }),
}

export default Schema ;