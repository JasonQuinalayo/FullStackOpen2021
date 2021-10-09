import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        }
      };
    default:
      return state;
  }
};

interface AddPatientAction {
  type: 'ADD_PATIENT';
  payload: Patient;
}

export const addPatient = (payload: Patient) : AddPatientAction => {
  return (
    {
      type: 'ADD_PATIENT',
      payload,
    }
  );
};

interface SetPatientListAction {
  type: 'SET_PATIENT_LIST';
  payload: Patient[];
}

export const setPatientList = (payload : Patient[]) : SetPatientListAction => {
  return (
    {
      type: 'SET_PATIENT_LIST',
      payload,
    }
  );
};

interface SetDiagnosisListAction {
  type: 'SET_DIAGNOSIS_LIST';
  payload: Diagnosis[];
}

export const setDiagnosisList = (payload: Diagnosis[]) : SetDiagnosisListAction => {
  return (
    {
      type: 'SET_DIAGNOSIS_LIST',
      payload,
    }
  );
};
