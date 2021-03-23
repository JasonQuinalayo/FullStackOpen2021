import axios from 'axios'
const url = '/api/persons';

const getAllPersons = () => (
  axios.get(url).then(response=>response.data)
)

const addNewPerson = (person) => (
  getAllPersons()
    .then(persons => {
      const possibleDuplicate = persons.find(personCheck => person.name === personCheck.name)
      if (possibleDuplicate) throw "DuplicationError"
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
      if (!personToUpdate) throw "AlreadyDeletedError"
      const updatedPerson = {...personToUpdate, number:personNumber}
      return axios.put(`${url}/${personToUpdate.id}`, updatedPerson)
        .then(()=>(updatedPerson))
    })
)

export default { getAllPersons, addNewPerson, deletePerson, updatePerson }
