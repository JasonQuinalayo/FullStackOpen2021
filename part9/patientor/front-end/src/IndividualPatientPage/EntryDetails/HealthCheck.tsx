import React from "react";
import { Header, Icon } from "semantic-ui-react";
import { HealthCheckEntry } from "../../types";
import DiagnosisCodes from "./DiagnosisCodes";

interface Props {
  entry: HealthCheckEntry;
}

const HealthCheck = ({ entry } : Props) => {
  return (
    <div>
      <Header>
        {entry.date}
        {' '}
        <Icon name="user md"/>
      </Header>
      <i>{entry.description}</i><br /><br />
      {[...Array(4 - entry.healthCheckRating).keys()].map((x) => <Icon key={x} name="heart"/>)}
      {[...Array(entry.healthCheckRating).keys()].map((x) => <Icon key={x} name="heart outline"/>)}
      <DiagnosisCodes codes={entry.diagnosisCodes}/>
    </div>
  );
};

export default HealthCheck;
