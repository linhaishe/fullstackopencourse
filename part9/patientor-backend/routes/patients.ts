import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  Entry,
  IPatientsEntry,
  NewEntry,
  NewEntrySchema,
  NewPatientEntry,
} from '../types/patients';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res: Response<IPatientsEntry[]>) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: any) {
    next(error);
  }
};

router.post(
  '/',
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<IPatientsEntry>
  ) => {
    const addedPatient = patientsService.addPatient(req.body);
    res.json(addedPatient);
  }
);

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: any) {
    next(error);
  }
};

router.post(
  '/:id/entry',
  newEntryParser,
  (req: Request<unknown, unknown, NewEntry>, res: Response<Entry>) => {
    const addedEntry = patientsService.addEntry('12', req.body);
    res.json(addedEntry);
  }
);

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
