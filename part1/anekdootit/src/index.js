import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button      = ({handleClick, name})  => <button onClick={handleClick}>{name}</button>
const VoteDisplay = ({selected, allVotes}) => <div>has {allVotes[selected]} votes</div>
const Anecdote    = ({header, anecdote})   => <div><h1>{header}</h1>{anecdote}</div>
  
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [allVotes, setAll] = useState(new Array(6).fill(0))
  const [mostPopular, setMostPopular] = useState(0)

  const randomAnecdote = () => {
    const randomNumber = Math.floor(Math.random()*6)
    setSelected(randomNumber) 
  }

  const vote = (selected, allVotes, mostPopular) => {
    const newVotes = [...allVotes]
    newVotes[selected] += 1
    setPopular(newVotes)
    setAll(newVotes)  
  }

  const setPopular = (allVotes) => {
    let maxValue = 0
    let maxIndex = 0

    for (let i=0; i < allVotes.length; i++) {
      if (allVotes[i] > maxValue) {
        maxValue = allVotes[i]
        maxIndex = i
      }
    }
    setMostPopular(maxIndex)
  }

  return (
    <div>
      <Anecdote header="Anecdote of the day" anecdote={props.anecdotes[selected]} />
      <VoteDisplay selected={selected} allVotes={allVotes} />
      <Button handleClick={()=>vote(selected, allVotes, mostPopular)} name="vote" />
      <Button handleClick={()=>randomAnecdote()} name="random anecdote" />
      <Anecdote header="Anecdote with the most votes" anecdote={props.anecdotes[mostPopular]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)