const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())
app.use(express.static('dist'))

app.use(morgan('tiny'))
const cors = require('cors')

app.use(cors())




let persons = [
          {
            "name": "Arto Hellas",
            "number": "040-123456",
            "id": "1"
          },
          {
            "name": "Ada Lovelace",
            "number": "39-44-5323523",
            "id": "2"
          },
          {
            "name": "Dan Abramov",
            "number": "12-43-234345",
            "id": "3"
          },
          {
            "name": "Mary Poppendieck",
            "number": "39-23-6423122",
            "id": "4"
          }
        ]



app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
 
    response.send(`<p>Phonebook has info for ${persons.length} people </p>
        <p> ${new Date()} </p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
   
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if(person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    console.log(request.params)
    const id = request.params.id
    //if(persons.find(person => person.id === id) ){
       persons = persons.filter(person => person.id !== id)
        response.status(204).end()
    /*}
    else {
        response.status(404).end()
    }*/
})

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
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
    
    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    
    persons = persons.concat(person)
    
    response.json(person)
})

  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})