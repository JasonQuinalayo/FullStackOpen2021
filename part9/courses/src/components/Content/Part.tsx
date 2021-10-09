import React from 'react';
import { CoursePart } from '../../types';

type Props = {
  course: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course } : Props) => {
  const base = <span><strong>{course.name} {course.exerciseCount}</strong></span>;
  switch(course.type) {
    case 'normal':
      return (
        <div>
          {base}<br/>
          <span><i>{course.description}</i></span>
        </div>
      );
    case 'groupProject':
      return (
        <div>
          {base}<br/>
          <span>project exercises {course.groupProjectCount}</span>
        </div>
      );
    case 'submission':
      return (
        <div>
          {base}<br/>
          <span><i>{course.description}</i></span><br/>
          <span>submit to {course.exerciseSubmissionLink}</span>
        </div>
      );
    case 'special':
      return (
        <div>
          {base}<br/>
          <span><i>{course.description}</i></span><br/>
          <span>required skills: {course.requirements.join(', ')}</span>
        </div>
      );
    default:
      return assertNever(course);
  }
};

export default Part
