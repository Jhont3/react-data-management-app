import { useEffect, useState, useRef, useMemo } from 'react'
import './App.css'
import { type User } from './types.d'
import { UserList } from './components/UserList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async resp => await resp.json())
      .then(resp => {
        setUsers(resp.results)
        originalUsers.current = resp.results
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const filteredUsers = useMemo(() => {
    // console.log('filterUsers')
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  // filter first, later sort
  const sortedUsers = useMemo(() => {
    // console.log('sortUsers')
    return sortByCountry
      ? filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
      : filteredUsers
  }, [filteredUsers, sortByCountry])

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

        <button onClick={handleReset}>
          Resetear lista de usuarios
        </button>

        <input placeholder='Filtrar por pais' onChange={(e) => {
          setFilterCountry(e.target.value)
        }} type="text" />

      </header>
      <main>
        <UserList deleteUser={handleDelete} showColors={showColors} users={sortedUsers}/>
      </main>
    </>
  )
}

export default App

// Options process:
// const sortUsers = (users: User[]) => {
//   // console.log('sortUsers')
//   return sortByCountry
//     ? users.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
//     : users
// }

// const sortedUsers = sortByCountry
//   ? filteredUsers.toSorted((a, b) => {
//     return a.location.country.localeCompare(b.location.country)
//   })
//   : filteredUsers

// const sortedUsers = sortByCountry
//   ? [...users].sort((a, b) => {
//       return a.location.country.localeCompare(b.location.country)
//     })
//   : users
