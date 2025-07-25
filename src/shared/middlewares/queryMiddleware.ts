import { NextFunction, Request, Response } from 'express';
import {z} from 'zod'

export const queryValidator = (schema: z.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }
    
    next();
}