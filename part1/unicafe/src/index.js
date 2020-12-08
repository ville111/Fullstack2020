import React, { useState} from 'react'
import ReactDOM from 'react-dom'




const Button = ({handleClick, name}) => (
  <button onClick={handleClick}> 
    {name} 
  </button> 
)

const StatisticLine = ({text, value}) => (
      <tr>
        <td> {text} </td>
        <td> {value} </td>
      </tr> 
  )

const Statistics = ({good, neutral, bad}) => {
  
  let total = good + neutral + bad

  // good=1, neutral=0, bad=-1
  let average = (good - bad) / total
  let positiveAverage = good / total * 100
  
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div> No feedback given </div>
    )
  }
  else {
    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={average.toFixed(1)} />
            <StatisticLine text="positive" value={positiveAverage.toFixed(2).toString() + "%"} />
          </tbody>
        </table>
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick = (category) => {
    
    if(category === 'good') {
      setGood(good+1)
    }
    else if (category === 'neutral') {
      setNeutral(neutral+1)
    }
    else {
      setBad(bad+1)
    }
  }

  return (
    <div>  
      <h1>give feedback</h1>
      <Button handleClick={()=>handleClick('good')} name="good" /> 
      <Button handleClick={()=>handleClick('neutral')} name="neutral" /> 
      <Button handleClick={()=>handleClick('bad')} name="bad" /> 

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)