import express, { Request, Response, NextFunction } from 'express';

import { z } from 'zod';
import { IPatientsEntry } from '../types/patients';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res: Response<IPatientsEntry[]>) => {
  res.send(patientsService.getNonSensitiveEntries());
});

// const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
//   try {
//     NewEntrySchema.parse(req.body);
//     console.log(req.body);
//     next();
//   } catch (error: unknown) {
//     next(error);
//   }
// };

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.use(errorMiddleware);

export default router;
