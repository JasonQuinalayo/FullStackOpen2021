import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../../AddPatientModal/FormField";
import { useStateValue } from "../../state";
import { NewEntry, OccupationalHealthcareEntry } from "../../types";

const OccupationalHealthcareEntryForm = ({ onSubmit } : { onSubmit: (entry:NewEntry)=>void }) => {
  const [{diagnoses}] = useStateValue();
  const [hasSickLeave, setHasSickLeave] = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        date: '',
        type: 'OccupationalHealthcare',
        specialist: '',
        diagnosisCodes: undefined, 
        description: '',
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      }}
      validate={(values:Omit<OccupationalHealthcareEntry, 'id'>) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date= requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
      onSubmit={(values)=>{
        const finalValues = {...values};
        if (!hasSickLeave) delete finalValues.sickLeave;
        if (values.diagnosisCodes && values.diagnosisCodes.length === 0) delete finalValues.diagnosisCodes;
        onSubmit(finalValues);
      }}
    >
      {({setFieldTouched, setFieldValue}) => (
        <Form className="form ui">
          <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
          />
          <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
          />
          <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
          />
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <Button type="button" onClick={()=>setHasSickLeave(prev=>!prev)}>Sick Leave</Button>
          {hasSickLeave && 
          <>
            <Field
              label="Sick Leave Start-Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End-Date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
          </>
          }
          <DiagnosisSelection 
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
            diagnoses={Object.values(diagnoses)}
          />
          <Button type="submit">Add</Button>
        </Form>
      )}
    </Formik>
  );
};

export default OccupationalHealthcareEntryForm;
