import { Diagnosis } from "../types";
import diagnoses from "../data/diagnoses";

const getDiagnoses = () : Array<Diagnosis> => {
  return diagnoses;
};

const getAllCodesSet = () : Set<Diagnosis['code']> => {
  const set = new Set<Diagnosis['code']>();
  diagnoses.forEach(diag => set.add(diag.code));
  return set;
};

export default { getDiagnoses, getAllCodesSet };
