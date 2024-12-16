import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import personService from './services/persons'


const Notification = ({ message }) => {

  if (message === null) {
    return null
  }

  const messageStyle = {
    color: 'green',
    fontStyle: 'bold',
    fontSize: 16,
    padding: 10,
    border: '4px solid green',
    borderRadius: 3
  }
  return (
    <div style={messageStyle}>
      {message} 
    </div>
  )
}

const Person = ({id, name, number,handleDeleteChange}) =>  (
    <div>
  <form>{id} {name} {number} <input type="button" value="delete" id={id} name={name} onClick={handleDeleteChange}/></form>
 </div>
)


const Persons = ({persons,handleDeleteChange}) =>  ( persons.map(person => <Person id={person.id} key={person.name} name={person.name} number={person.number} handleDeleteChange={handleDeleteChange}/>) )

const Inputrow = ({label, value, onChange}) => (
  <div>{label}: <input value={value} onChange={onChange} /></div>
)

const Personform = ({addPerson,newName, newNumber, handlePersonChange,handleNumberChange }) => ( 
    <form onSubmit={addPerson}>
    <Inputrow label='name' value={newName} onChange={handlePersonChange} />
    <Inputrow label='number' value={newNumber} onChange={handleNumberChange} />
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => newName === person.name)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      const personObject = { name: newName, number: newNumber }
      personService
      .create(personObject)
      .then(returnedPerson => {
       
        setNotificationMessage(
          `Added '${newName}'`
        ) 
        setTimeout(() => {
          setNotificationMessage(null)
        }, 2000)

        setPersons(persons.concat(returnedPerson))
      
      })
     
    }
    setNewName('')
    setNewNumber('')
    
  }

  const handlePersonChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleDeleteChange = (event) => {
   
    if (window.confirm(`Delete ${event.target.name}?`)) {
      personService
      .remove(event.target.id)
      .then(deletedPerson => {
          console.log(`${event.target.name} deleted`)
          setNotificationMessage(
            `Deleted '${event.target.name}'`
          ) 
          setTimeout(() => {
            setNotificationMessage(null)
          }, 2000)
  
          setPersons(persons.filter(person => person.id != deletedPerson.id))
      })
     
    }
  }
  

  return (
    <div>
      <h2>Phonebook</h2>

     <Notification message={notificationMessage} />
     <Personform addPerson={addPerson}
      newName={newName}
      newNumber={newNumber} 
      handlePersonChange={ handlePersonChange}
      handleNumberChange={handleNumberChange} 
      />

      <h2>Numbers</h2>
      
      <Persons persons={persons} 
      handleDeleteChange={handleDeleteChange} />
      
    </div>
  )

}

export default App