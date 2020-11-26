import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const VotesNumber =({voted})=>{
  return (
    <div>
      <p>has {voted} votes </p>
    </div>
  )
}

const TopNote =({topVotes,voted})=>{
return (
  <div>
    <h1> Anecdote with most votes </h1>
    <p>{anecdotes[topVotes]}</p>
    <p>has {voted[topVotes]} votes</p>
  </div>
)
}


const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(anecdotes.map(()=> 0))
  
  const getRandom=()=>{
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const topVotes = voted.indexOf(Math.max(...voted))


  const vote =()=>{
    const voteCopy = [...voted];
    //selected为第几个，则votecopy中的第几个则加1
    voteCopy[selected]++
    //setVoted 直接更新为计算后的数组
    setVoted(voteCopy)
    console.log(Math.max(...voteCopy));
   }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <VotesNumber voted={voted[selected]}/>
      <Button onClick={vote} text='vote' />
      <Button onClick={getRandom} text='next anecdote' />
      <TopNote topVotes={topVotes} voted={voted}/>
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
