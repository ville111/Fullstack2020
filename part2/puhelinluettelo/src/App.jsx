import { useState } from 'react'

const Person = ({name, number}) => (<p>{name} {number}</p>)
const Persons = ({persons}) =>  ( persons.map(person => <Person key={person.name} name={person.name} number={person.number} />) )

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '0955555'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => newName === person.name)) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat({ name: newName, number: newNumber })) 
    }
    setNewName('')
    setNewNumber('')
    
  }

  const handlePersonChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  

  return (
    <div>
      <h2>Phonebook</h2>

     <Personform addPerson={addPerson}
      newName={newName}
      newNumber={newNumber} 
      handlePersonChange={ handlePersonChange}
      handleNumberChange={handleNumberChange} 
      />

      <h2>Numbers</h2>
      
      <Persons persons={persons} />
      
    </div>
  )

}

export default App