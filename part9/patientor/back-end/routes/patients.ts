import express from 'express';
import patientsService from '../services/patientsService';
import { toNewEntry, toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.get('/:id', (req, res) => {
  res.send(patientsService.getPatientById(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = patientsService.addPatient(toNewPatient({...req.body, entries:[]}));
    res.send(newPatient);
  } catch (e) {
    if (e instanceof Error) res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientsService.addEntry(req.params.id, toNewEntry(req.body));
    res.send(patient);
  } catch(e) {
    console.log(req.body);
    console.log(e);
    if (e instanceof Error) res.status(400).send(e.message);
  }
});

export default router;
