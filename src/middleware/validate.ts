import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

// Middleware to validate requests using Zod schemas
const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params
    });
    next();
  } catch (error: any) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid request data',
      errors: error.errors
    });
  }
};

export default validate; 