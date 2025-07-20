import { Request, Response, NextFunction } from "express" ;
import GenericError from '../../utils/GenericError' ;

const errorHandler = (err: Error | GenericError, req: Request, res: Response, next: NextFunction) => {

    const time = Date.now() ;
    const method = req.method ; 
    const url = req.host ;
    if (err instanceof GenericError) {
        return res.status(err.statusCode).json({
            message: err.message,
            method: method,
            statusCode: err.statusCode,
            time: time,
        });
    } 

  return res.status(500).json({
    message: "Error interno del servidor",
    host: url,
    method: method,
    statusCode: 500,
    time: time,
  });

};

export default errorHandler ;
