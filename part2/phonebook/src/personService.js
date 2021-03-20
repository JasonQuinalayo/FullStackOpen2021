import axios from 'axios'
const url = 'http://localhost:3001/persons';

const getAllPersons = () => (
  axios.get(url).then(response=>response.data)
)

const addNewPerson = (person) => (
  getAllPersons()
    .then(persons => {
      const possibleDuplicate = persons.find(personCheck => person.name === personCheck.name)
      if (possibleDuplicate) throw new Error(`${person.name} already added to server`)
      return axios.post(url, person).then(response=>response.data)
    })
)

const deletePerson = (personName) => (
  getAllPersons()
    .then(persons=>{
      const personToDelete = persons.find(person => person.name === personName)
      return axios.delete(`${url}/${personToDelete.id}`)
        .then(()=>persons.filter(person=>person.id !== personToDelete.id))
    })
)

const updatePerson = (personName, personNumber) => (
  getAllPersons()
    .then(persons=>{
      const personToUpdate = persons.find(person=> person.name === personName)
      if (!personToUpdate) throw new Error(`${personName} already deleted from server`)
      const updatedPerson = {...personToUpdate, number:personNumber}
      return axios.put(`${url}/${personToUpdate.id}`, updatedPerson)
        .then(()=>{
          const newPersons = persons.filter(person=>person.name !== personName)
          newPersons.push(updatedPerson);
          return newPersons;
        })
    })
)

export default { getAllPersons, addNewPerson, deletePerson, updatePerson }