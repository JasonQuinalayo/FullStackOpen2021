import React from "react";
import { Header, Icon } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from '../../types';
import DiagnosisCodes from "./DiagnosisCodes";

interface Props {
	entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcare = ({ entry } : Props) => {
	return (
		<div>
      <Header>
        {entry.date}
        {' '}
        <Icon name="stethoscope"/>
        {' '}
				{entry.employerName}
      </Header>
      <i>{entry.description}</i><br /><br />
      {entry.sickLeave ? <p>Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>
      : <p>No sick leave</p>}
      <DiagnosisCodes codes={entry.diagnosisCodes}/>
    </div>
  );
};

export default OccupationalHealthcare;
