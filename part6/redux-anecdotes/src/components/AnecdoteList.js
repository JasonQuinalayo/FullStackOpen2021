import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())))
  const dispatch = useDispatch()
  const handleVote = ({id, content}) => () => {
    dispatch(vote(id))
    dispatch(notify(`You voted for '${content}'`, 5))
  }
  return ( 
    <>
      {anecdotes.sort((b,a) => { return a.votes < b.votes ? -1 : a.votes === b.votes ? 0 : 1 }).map(({id, content, votes}) => (
      <div key={id}>
        <div>
        {content}
        </div>
        <div>
        has {votes}
        <button onClick={handleVote({ id, content })}>vote</button>
        </div>
      </div>
      ))}
    </>
  )
}

export default AnecdoteList
