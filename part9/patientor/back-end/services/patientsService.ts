import patients from "../data/patients";
import { Patient, NewPatient, PatientWithoutSSN, NewEntry } from "../types";
import { v4 as uuidv4 } from 'uuid';

const getPatients = () : Array<PatientWithoutSSN> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => (
    {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    }
  ));
};

const getPatientById = (id : string) : Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patientEntry: NewPatient) : Patient => {
  const id : string = uuidv4();
  const newPatient = {
    id,
    ...patientEntry,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry) : Patient => {
  const patientIndex = patients.findIndex((patient) => patient.id === patientId);
  if (patientIndex === -1) throw new Error('patient not found');
  patients[patientIndex].entries.push({
    ...entry,
    id: uuidv4(),
  });
  return patients[patientIndex];
};

export default { getPatients, getPatientById, addPatient, addEntry };
