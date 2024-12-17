const express = require('express')
require('dotenv').config()
const Person = require('./models/person')
const app = express()
const morgan = require('morgan')
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny'))
const cors = require('cors')
app.use(cors())

let persons = []

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
   
    console.log('info')
    Person.find({}).then(persons => {
        response.send(`<p>Phonebook has info for ${persons.length } people </p>
            <p> ${new Date()} </p>`)
      
    }).catch(error => next(error))

})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)   
      
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    console.log("id", id)
   
    Person.findById(id).then(person => {
       
        console.log('person', person)
        response.json(person)   
  
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    console.log(request.params)
    const id = request.params.id
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        persons = persons.filter(person => person.id !== id)
        response.status(204).end()
    }).catch(error => next(error))
   

})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
}

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    console.log(body)

    if (!body.name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })
    }
    else if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
    }
    else if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
    }
    
    const person = new Person({
        name: body.name,
        number: body.number
    })
    
    person.save()
        .then(savedPerson => {
            console.log(`added ${body.name} ${body.number} to phonebook`)
            response.json(savedPerson)
        }).catch(error => next(error))
    
  
})

app.put('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    const body = request.body
    console.log('put:',body)

    if (!body.name) {
        return response.status(400).json({ 
          error: 'name missing' 
        })
    }
    else if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
    }
    
    const person = {
        name: body.name,
        number: body.number
    }
    
    Person.findByIdAndUpdate(id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
    

})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        console.log("validation error")
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  // tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})