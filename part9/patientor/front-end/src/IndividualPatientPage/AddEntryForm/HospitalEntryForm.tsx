import { Field, Form, Formik } from "formik";
import React from "react";
import { Button } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../../AddPatientModal/FormField";
import { useStateValue } from "../../state";
import { HospitalEntry, NewEntry } from "../../types";

const HospitalEntryForm = ({ onSubmit } : { onSubmit: (entry:NewEntry) => void}) => {
  const [{diagnoses}] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: '',
        type: 'Hospital',
        specialist: '',
        diagnosisCodes: undefined, 
        description: '',
        discharge: {
          date: '',
          criteria: '',
        }
      }}
      validate={(values:Omit<HospitalEntry, 'id'>) => {
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
        if (!values.discharge.date) {
          errors.discharge = requiredError;
        }
        if (!values.discharge.criteria) {
          errors.discharge = requiredError;
        }
        return errors;
      }}
      onSubmit={(values)=>{
        const finalValues = {...values};
        if (values.diagnosisCodes && values.diagnosisCodes.length === 0) delete finalValues.diagnosisCodes;
        onSubmit(finalValues);
      }}
    >
      {({touched, errors, setFieldTouched, setFieldValue}) => (
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
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          {touched.discharge?.date && errors.discharge && <div style={{color:'red'}}>{errors.discharge}</div>}
          <Field
            label="Discharge Criteria"
            placeholder="Criteria"
            name="discharge.criteria"
            component={TextField}
          />
          {touched.discharge?.criteria && errors.discharge && <div style={{color:'red'}}>{errors.discharge}</div>}
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

export default HospitalEntryForm;