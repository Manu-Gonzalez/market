import { NextFunction, Request, Response } from 'express';
import {z} from 'zod'

export const paramsValidator = (schema: z.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }
    next();
}