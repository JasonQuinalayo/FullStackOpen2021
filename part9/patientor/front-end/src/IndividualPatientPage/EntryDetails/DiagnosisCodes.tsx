import React from "react";
import { List } from "semantic-ui-react";
import { useStateValue } from "../../state";
import { Diagnosis } from '../../types';

interface Props {
  codes: Array<Diagnosis['code']> | undefined;
}

const DiagnosisCodes = ({ codes } : Props) => {
  const [{ diagnoses },] = useStateValue();
  return (
    <List.List as="ul">
      {codes && codes.map((code) => (
        <List.Item as="li" key={code}>
          {code}
          {' '}
          {diagnoses && diagnoses[code].name}
        </List.Item>
      ))}
    </List.List>
  );
};

export default DiagnosisCodes;
