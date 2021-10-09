import React from 'react';
import { CoursePart } from '../../types';
import Part from './Part';

type Props = {
  courseParts: CoursePart[];
}

const Content = ({ courseParts } : Props) => {
  return (
    <div>
      {courseParts.map(course => (
        <div key={course.name}><Part course={course}/><br/></div>
      ))}
    </div>
  );
};

export default Content
