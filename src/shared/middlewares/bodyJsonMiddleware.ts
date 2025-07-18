import { NextFunction, Response } from "express";
import { z, type ZodObject} from "zod";

export const bodyValidator = (schema : z.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }

    next(result.error);
}

