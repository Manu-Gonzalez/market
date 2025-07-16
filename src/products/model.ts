import { NextFunction, Request, Response } from 'express'
import db from '../config/prisma'
import { QueryResult } from 'mysql2';

// export default  interface User {
//     id: number | null,
//     username : string | null,
//     password : string | null,
//     email : string | null,
// }

export default interface Product {
    id : number | null ;
    nombre : string | null ;
    precio : number | null ;
    id_categoria : number | null ;
}

