import React from 'react'

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, value) => (acc + value.exercises), 0)
  return(
    <p><strong>Number of exercises {sum}</strong></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(value => (<Part key={value.id} part={value} />))}
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h3>{course.name}</h3>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course}/>
      <Content course={course} />
      <Total course={course} />
      <br />
    </div>
  )
}

export default Course