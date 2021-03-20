import React, { useState, useEffect } from 'react'
import personService from './personService'

const Filter = ({handler, value}) => (
  <div>
    filter shown by: <input onChange={handler} value={value}/>
  </div>
)

const PersonForm = ({handleSubmit, handleNameChange, handleNumberChange, newName, newNumber}) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input onChange={handleNameChange} value={newName}/><br />
      number: <input onChange={handleNumberChange} value={newNumber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({persons, newFilter, handleDelete }) => (
  <table>
    <tbody>
      {persons
      .filter(person=> (
        person.name.toLowerCase().startsWith(newFilter.toLowerCase())
      ))
      .sort((a,b) => (a.name < b.name ? -1 : a.name === b.name ? 0 : 1))
      .map(person=>(
        <tr key={person.id}>
          <td>{person.name}</td>
          <td>{person.number}</td>
          <td><button id={person.name} onClick={handleDelete}>delete</button></td>
        </tr>
      ))}
    </tbody>
  </table>
)

const Notification = ({color, message}) => {
  const notificationStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <h4 style={notificationStyle}>{message}</h4>
  )
}

const Error = ({message}) => {
  return message 
  ? (
    <Notification color='red' message={message} />
  )
  : <div></div>
}

const Confirmation = ({message}) => {
  return message 
  ? (
    <Notification color='green' message={message} />
  )
  : <div></div>
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setFilterString] = useState('')
  const [ confirmation, setConfirmation] = useState('')
  const [ error, setError] = useState('')
  useEffect(()=>{
    personService.getAllPersons()
      .then(data=>setPersons(data))
      .catch(err=>console.log(err))
  }, [])
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!(persons.map(a=>a.name).includes(newName))) {
      const newPerson = {name: newName, number: newNumber}
      personService.addNewPerson(newPerson)
        .then(newPersonWithId => {
          setPersons(persons.concat(newPersonWithId))
          setError('')
          setConfirmation(`Successfully added ${newName}`)
        })
    } else {
      if (window.confirm(`${newName} is already added to the phonebook, replace old number?`)) {
        personService.updatePerson(newName, newNumber)
          .then(newPersons => {
            setPersons(newPersons)
            setError('')
            setConfirmation(`Successfully updated ${newName}`)
          })
          .catch(err => {
            console.log(err)
            setConfirmation('')
            setError(`${newName} has already been removed from the server`)
          })
      }
    }
    setNewNumber('')
    setNewName('')
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }
  const handleDelete = (event) => {
    const personName = event.target.id
    if (window.confirm(`Delete ${personName}?`))
    personService.deletePerson(personName)
      .then(newPersons=>{
        setPersons(newPersons)
        setError('')
        setConfirmation(`Deleted ${personName}`)
      })
      .catch(err=>console.log(err))
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Confirmation message={confirmation} />
      <Error message={error} />
      <Filter handler={handleFilterChange} value={filterString}/>
      <h3>Add New</h3>
      <PersonForm 
        handleNameChange={handleNameChange} 
        handleSubmit={handleSubmit}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons newFilter={filterString} persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
