import diagnosesService from "./services/diagnosesService";
import { NewPatient, Gender, Entry, NewEntry, BaseEntryWithoutId, Diagnosis, HealthCheckRating } from "./types";

const isString = (text: unknown) : text is string => {
  return typeof text == 'string' || text instanceof String;
};

const parseGenericStringProperty = (propertyValue: unknown, propertyName: string) : string => {
  if (!propertyValue || !isString(propertyValue)) throw new Error(`invalid ${propertyName}`);
  return propertyValue;
};

const parseDateOfBirth = (date: unknown) : string => {
  if (!date || !isString(date) || !Date.parse(date)) throw new Error('Incorrect or missing date: ' + date);
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any) : gender is Gender => (
  Object.values(Gender).includes(gender)
);

const parseGender = (gender: unknown) : Gender => {
  if (!gender || !isGender(gender)) throw new Error('invalid gender');
  return gender;
};

const isEntry = (entry: unknown) : entry is Entry => {
  return entry === entry;
};

const isEntries = (entries: unknown[]) : entries is Entry[] => {
  return entries.reduce((prev: boolean, cur: unknown) => prev && isEntry(cur), true);
};

const parseEntries = (entries: unknown) : Entry[] => {
  if (!entries || !Array.isArray(entries) || !isEntries(entries)) throw new Error('invalid entries');
  return entries;
};

type NewPatientFields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown , entries: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }: NewPatientFields) : NewPatient => (
  {
    name: parseGenericStringProperty(name, 'name'),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseGenericStringProperty(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseGenericStringProperty(occupation, 'occupation'),
    entries: parseEntries(entries),
  }
);

interface NewBaseEntryFields { 
  date: unknown; 
  specialist: unknown;
  diagnosisCodes: unknown | undefined;
  description: unknown;
}

const isDiagnosisCodes = (diagnosisCodes: Array<unknown>) : diagnosisCodes is Array<Diagnosis['code']> => {
  const codes: Set<Diagnosis['code']> = diagnosesService.getAllCodesSet();
  return diagnosisCodes.reduce<boolean>((cum, diag) => cum && isString(diag) && codes.has(diag), true);
};

const parseDiagnosisCodes = (diagnosisCodes: unknown) : Array<Diagnosis['code']> | undefined => {
  if (diagnosisCodes === undefined) return diagnosisCodes;
  if (!Array.isArray(diagnosisCodes) || !isDiagnosisCodes(diagnosisCodes)) throw new Error('invalid diagnosis codes');
  return diagnosisCodes;
};

const toNewBaseEntry = ({ date, specialist, diagnosisCodes, description } : NewBaseEntryFields) : BaseEntryWithoutId => (
  {
    date: parseGenericStringProperty(date, 'date'),
    specialist: parseGenericStringProperty(specialist, 'specialist'),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    description: parseGenericStringProperty(description, 'description'),
  }
);

interface NewOccupationalHealthcareEntryFields extends NewBaseEntryFields {
  type: unknown;
  employerName: unknown;
  sickLeave? : { startDate: unknown, endDate: unknown };
}

interface NewHealthCheckEntryFields extends NewBaseEntryFields {
  type: unknown;
  healthCheckRating: unknown;
}

interface NewHospitalEntryFields extends NewBaseEntryFields {
  type: unknown;
  discharge: {
    date: unknown;
    criteria: unknown;
  }
}

const parseSickLeave = ({startDate, endDate}: {startDate: unknown, endDate: unknown}) : { startDate:string, endDate:string } => (
  {
    startDate: parseGenericStringProperty(startDate, 'startDate'),
    endDate: parseGenericStringProperty(endDate, 'endDate'),
  }
);

const toNewOccupationalHealthcareEntry = 
  ({date, specialist, diagnosisCodes, description, employerName, sickLeave} : NewOccupationalHealthcareEntryFields) : NewEntry => (
  {
    ...toNewBaseEntry({date, diagnosisCodes, description, specialist}),
    type: 'OccupationalHealthcare',
    employerName: parseGenericStringProperty(employerName, 'employerName'),
    sickLeave:  sickLeave === undefined ? undefined : parseSickLeave(sickLeave),
  }
);

const parseHealthCheckRating = (rating :unknown) : HealthCheckRating => {
  if (rating === undefined) throw new Error('invalid healthcheck rating');
  const numRating = Number(rating);
  if (isNaN(numRating) || numRating < 0 || numRating > 3) throw new Error('invalid healthcheck rating');
  return numRating;
};

const toNewHealthCheckEntry = 
  ({ date, specialist, diagnosisCodes, description, healthCheckRating } : NewHealthCheckEntryFields) : NewEntry => (
  {
    ...toNewBaseEntry({date, diagnosisCodes, description, specialist}),
    type: 'HealthCheck',
    healthCheckRating: parseHealthCheckRating(healthCheckRating),
  }
);

const toNewHospitalEntry =
  ({ date, specialist, diagnosisCodes, description, discharge } : NewHospitalEntryFields) : NewEntry => (
  {
    ...toNewBaseEntry({date, diagnosisCodes, description, specialist}),
    type: 'Hospital',
    discharge : { date: parseGenericStringProperty(discharge.date, 'discharge date'), criteria: parseGenericStringProperty(discharge.criteria, 'discharge criteria')},
  }
);

export const toNewEntry = (entry: NewHealthCheckEntryFields | NewHospitalEntryFields | NewOccupationalHealthcareEntryFields) : NewEntry => {
  switch(entry.type) {
    case 'HealthCheck':
      return toNewHealthCheckEntry(entry as NewHealthCheckEntryFields);
    case 'OccupationalHealthcare':
      return toNewOccupationalHealthcareEntry(entry as NewOccupationalHealthcareEntryFields);
    case 'Hospital':
      return toNewHospitalEntry(entry as NewHospitalEntryFields);
    default:
      throw new Error('invalid entry type');
  }
};
