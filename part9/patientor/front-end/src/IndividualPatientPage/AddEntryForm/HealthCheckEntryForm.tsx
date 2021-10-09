import { Field, Form, Formik } from "formik";
import React from "react";
import { Button } from "semantic-ui-react";
import { DiagnosisSelection, NumberField, TextField } from "../../AddPatientModal/FormField";
import { useStateValue } from "../../state";
import { HealthCheckEntry, NewEntry } from "../../types";

const HealthCheckEntryForm = ({ onSubmit } : { onSubmit: (entry:NewEntry) => void}) => {
  const [{diagnoses}] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: '',
        type: 'HealthCheck',
        specialist: '',
        diagnosisCodes: undefined, 
        description: '',
        healthCheckRating: 0,
      }}
      validate={(values:Omit<HealthCheckEntry, 'id'>) => {
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
        if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
          errors.healthCheckRating = 'rating must be between 0 and 3';
        }
        return errors;
      }}
      onSubmit={(values)=>{
        const finalValues = {...values};
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
            label="Health check rating(0 -> 3 with 0 being the healthiest)" 
            min={0} 
            max={3} 
            name="healthCheckRating"
            errorMessage="Must be between 0 and 3"
            component={NumberField}
          />
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

export default HealthCheckEntryForm;
