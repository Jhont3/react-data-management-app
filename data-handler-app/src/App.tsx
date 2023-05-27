import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { UserList } from './components/UserList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async resp => await resp.json())
      .then(resp => {
        setUsers(resp.results)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : users

  // Option:
  // const sortedUsers = sortByCountry
  //   ? [...users].sort((a, b) => {
  //       return a.location.country.localeCompare(b.location.country)
  //     })
  //   : users

  return (
    <>
      <h1>Lista de usuarios</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No ordenar por país' : 'Ordernar por país'}
        </button>
      </header>
      <main>
        <UserList showColors={showColors} users={sortedUsers}/>
      </main>
    </>
  )
}

export default App
