import React, { useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS_WITH_GENRE, ME } from '../queries'

const Recommendations = ({ show }) => {
  const [getBooks, books] = useLazyQuery(ALL_BOOKS_WITH_GENRE)
  const me = useQuery(ME)

  useEffect(() => {
    if (me.data && me.data.me) getBooks({ variables: { genre: me.data.me.favoriteGenre.toLowerCase() } })
  }, [getBooks, me.data])

  if (!show || !books.data) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
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
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations 
