import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Dropdown, Modal } from "semantic-ui-react";
import { apiBaseUrl } from "../../constants";
import { addPatient, useStateValue } from "../../state";
import { NewEntry, Patient } from "../../types";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealthcareEntryForm from "./OccupationalHealthcareEntryForm";

const options = [
  {key:'hospital', text:'Hospital', value:'hospital'},
  {key:'occupational', text:'Occupational Healthcare', value:'occupational'},
  {key:'healthCheck', text:'Health Check', value:'healthCheck'},
];

interface Props {
  open:boolean;
  onClose: () => void;
}

const AddEntryForm = ({ open, onClose }: Props) => {
  const [entryType, setEntryType] = useState<string>('');
  const [, dispatch] = useStateValue();
  const { id } = useParams<{id: string}>();
  const close = () => {setEntryType('');onClose();};
  const onSubmit = async (entry: NewEntry) => {
    const newPatient = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, entry);
    dispatch(addPatient(newPatient.data));
    close();
  };

  return (
    <Modal open={open} closeIcon onClose={close}>
      <Modal.Header>
        Add Entry
      </Modal.Header>
      <Modal.Content>
        <Dropdown placeholder="Entry type" fluid selection options={options}
          onChange={(_, data)=>setEntryType(data.value as string)}
        />
        {entryType === '' ? null : entryType === 'hospital' ? <HospitalEntryForm onSubmit={onSubmit}/> :
        entryType === 'occupational' ? <OccupationalHealthcareEntryForm onSubmit={onSubmit}/> :
        <HealthCheckEntryForm onSubmit={onSubmit}/>}
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryForm;
