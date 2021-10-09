import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Container, Header, Icon, List, Segment } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { addPatient, useStateValue } from '../state';
import { Patient, Gender } from '../types';
import EntryDetails from './EntryDetails';
import AddEntryForm from './AddEntryForm';

const IndividualPatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [entryFormOpen, setEntryFormOpen] = useState<boolean>(false);

  useEffect(() => {
    const f = async () => {
      const newPatient = patients[id];
      if (!newPatient) return;
      if (newPatient.ssn) {
        setPatient(newPatient);
      } else {
        const updatedPatient = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(addPatient(updatedPatient.data));
        setPatient(updatedPatient.data);
      }
    };
    void f();
  }, [patients]);

  if (!patient || !patient.ssn) return null;
	return (
    <Container>
      <Header>
        {patient.name}
        {' '}
        <Icon className={patient.gender === Gender.Male ? "mars" : patient.gender === Gender.Other ? "mars stroke vertical" : "venus"} />
      </Header>
      {patient.ssn}
      <br/>
      {patient.occupation}
      <Header>
        Entries
      </Header>
      <Button onClick={()=>setEntryFormOpen(true)}>
        Add Entry
      </Button>
      <AddEntryForm open={entryFormOpen} onClose={()=>setEntryFormOpen(false)}/>
      <List>
      {patient.entries.map((entry) => (
        <List.Item key={entry.id}>
          <Segment>
            <EntryDetails entry={entry}/>
          </Segment>
        </List.Item>
      ))}
      </List>
    </Container>
  );
};

export default IndividualPatientPage;
