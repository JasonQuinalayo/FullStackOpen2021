import React, { useState } from 'react'

const DisplayAnecdote = ({anecdote, votes}) => (
  <>
  <span>{anecdote}</span><br/>
  <span>has {votes} votes</span><br />
  </>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [selected, setSelected] = useState(0)
  const [votesCount, setVotesCount] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const getRandomInt = (max) => Math.floor(Math.random() * max);
  const handleNextAnecdoteClick= () => {
    let randomInt = getRandomInt(anecdotes.length);
    if (randomInt === selected) {
      if (randomInt === 0) randomInt++;
      else randomInt--;
    }
    setSelected(randomInt);
  }

  const handleVoteClick = () => {
    const newVotes = [...votesCount];
    newVotes[selected]++
    setVotesCount(newVotes);
  }

  const mostVotesIndex = votesCount.reduce((acc, element, index) => (element > votesCount[acc] ? index : acc), 0)

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <DisplayAnecdote anecdote={anecdotes[selected]} votes={votesCount[selected]}/>
      <button onClick={handleVoteClick}>vote</button>
      <button onClick={handleNextAnecdoteClick}>next anecdote</button>
      <h1>Anecdote with Most Votes</h1>
      <DisplayAnecdote anecdote={anecdotes[mostVotesIndex]} votes={votesCount[mostVotesIndex]}/>
    </div>
  )
}

export default App
