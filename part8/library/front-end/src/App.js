import React, { useEffect, useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { ME, BOOK_ADDED_SUBSCRIPTION, ALL_BOOKS, ALL_BOOKS_WITH_GENRE } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const client = useApolloClient()
  const me = useQuery(ME)

  useEffect(() => {
    const tok = localStorage.getItem('user-token')
    if (tok) setToken(tok)
  }, [])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const allBooksInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(allBooksInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: allBooksInStore.allBooks.concat(addedBook) }
      })
    }   

    const allBooksInStoreWithGenre = client.readQuery({ 
      query: ALL_BOOKS_WITH_GENRE,
      variables: { genre: me.data.me.favoriteGenre.toLowerCase() }
    })
    if (!includedIn(allBooksInStoreWithGenre.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS_WITH_GENRE,
        variables: { genre: me.data.me.favoriteGenre.toLowerCase() },
        data: { allBooks: allBooksInStoreWithGenre.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const logout = async () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <div>{errorMessage}</div><br />

      <Login 
        show={page === 'login'}
        setToken={setToken}
        setError={setErrorMessage}
        setPage={setPage}
      />

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Recommendations
        show={page === 'recommendations'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        token={token}
      />

    </div>
  )
}

export default App
