import { NextFunction, Request, Response } from 'express'

// export default  interface User {
//     id: number ,
//     username : string ,
//     password : string ,
//     email : string ,
// }

export default interface Product {
    id : number ;
    nombre : string ;
    precio_unidad : number ;
    id_categoria : number ;
}

