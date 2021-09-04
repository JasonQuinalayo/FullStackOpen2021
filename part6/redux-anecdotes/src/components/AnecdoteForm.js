import React from "react";
import { connect } from "react-redux";
import { addAnecdote as addAnecdoteAction } from "../reducers/anecdoteReducer";
import { notify as notifyAction } from '../reducers/notificationReducer'

const AnecdoteForm = ({ notify, addAnecdote }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    notify(`You added '${content}'`, 10)
    addAnecdote(content)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  notify: notifyAction,
  addAnecdote: addAnecdoteAction,
}
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
