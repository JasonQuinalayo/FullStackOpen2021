  
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {refetchQueries: [{query:ALL_AUTHORS}]})

  const [author, setAuthor] = useState(null)
  const [born, setBorn] = useState('')

  if (!props.show || authors.loading) {
    return null
  }

  const options = authors.data.allAuthors.map(a => ({value:a.name, label:a.name}))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      { props.token && 
        <div>
          <h3>Set birthyear</h3>
          <span>Name</span>
          <Select 
            defaultValue={author} 
            onChange={setAuthor}
            options={options}
          />
          <span>Born</span>
          <input type="text" value={born} onChange={(e)=>setBorn(e.target.value)}/>
          <button type="button" onClick={()=>{editAuthor({variables: {name:author.value, setBornTo:parseInt(born)}});setBorn('')}}>Update author</button>
        </div>
      }

    </div>
  )
}

export default Authors
