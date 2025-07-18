import { z } from "zod";

const Schema = {
    userBodySchema : z.object({
     username : z.string().min(1, "El nombre de usuario es requerido"),
     email : z.string().min(1, { message: "no cumple con el minimo de caracteres (1) antes del @ (arroba)" })
     .email("El email ingresado no es valido"),
     password: z.string().min(8, "La contraseña debe contener 8 caracteres minimo"),
    }),
    
    userLoginSchema : z.object({
     username : z.string().min(1, "El nombre de usuario es requerido"),
     password: z.string().min(8, "La contraseña debe contener 8 caracteres minimo"),
    }),
    
    userParamsSchema : z.object({
     id: z.coerce.number({
       invalid_type_error: "El id debe ser un número",
     }),
    }),
    
    userQuerySchema : z.object({
     page: z.coerce.number({
       invalid_type_error: "Debe ingresar un numero entero en el numero de pagina",
     }).min(1).optional(),
    }),
}

export default Schema ;