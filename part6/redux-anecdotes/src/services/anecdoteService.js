import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const addAnecdote = async (content) => {
  const res = await axios.post(baseUrl, { content, votes:0 })
  return res.data
}

const vote = async (id) => {
  const url = `${baseUrl}/${id}`
  const anecdote = await axios.get(url)
  const res = await axios.put(url, {...anecdote.data, votes:anecdote.data.votes + 1})
  return res.data
}

const exportObj = { getAll, addAnecdote, vote }

export default exportObj
