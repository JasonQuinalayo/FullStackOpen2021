import React from "react";
import { Header, Icon } from "semantic-ui-react";
import { HospitalEntry } from '../../types';
import DiagnosisCodes from "./DiagnosisCodes";

interface Props {
	entry: HospitalEntry;
}

const Hospital = ({ entry } : Props) => {
	return (
		<div>
      <Header>
        {entry.date}
        {' '}
        <Icon name="hospital"/>
      </Header>
      <i>{entry.description}</i><br /><br />
			<p>Discharged on {entry.discharge.date}. <strong>{entry.discharge.criteria}</strong></p>
			<DiagnosisCodes codes={entry.diagnosisCodes}/>
		</div>
	);
};

export default Hospital;
