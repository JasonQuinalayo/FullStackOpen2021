import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = (props) => {
  const [genres, setGenres] = useState(null)
  const [filter, setFilter] = useState('')
  const books = useQuery(ALL_BOOKS)

  useEffect(() =>{
    if (books.data && books.data.allBooks) setGenres(new Set(books.data.allBooks.reduce((prev, cur) => {
      return prev.concat(cur.genres.map(genre=>genre.toLowerCase()))
    }, [])))
  }, [books.data])

  if (!props.show || books.loading) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <div>current genre filter: {filter ? filter : 'none'}</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks.map(a =>(
              (!filter || a.genres.map(genre=>genre.toLowerCase()).includes(filter)) && 
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {genres && 
      [...genres].map(genre => (
          <button key={genre} onClick={()=>setFilter(genre)}>{genre}</button>
        )
      )}
      <button onClick={()=>setFilter('')}>Remove filter</button>
    </div>
  )
}

export default Books
