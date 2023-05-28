import { useEffect, useState, useRef, useMemo } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UserList } from './components/UserList'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
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

    if (sorting === SortBy.NONE) return filteredUsers
    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted(
        (a, b) => a.location.country.localeCompare(b.location.country)
      )
    }
    if (sorting === SortBy.NAME) {
      return filteredUsers.toSorted(
        (a, b) => a.name.first.localeCompare(b.location.country)
      )
    }
    if (sorting === SortBy.LAST) {
      return filteredUsers.toSorted(
        (a, b) => a.name.last.localeCompare(b.location.country)
      )
    }
    return []
  }, [filteredUsers, sorting])

  return (
    <>
      <h1>Lista de usuarios</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear filas
        </button>

        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordernar por país'}
        </button>

        <button onClick={handleReset}>
          Resetear lista de usuarios
        </button>

        <input placeholder='Filtrar por pais' onChange={(e) => {
          setFilterCountry(e.target.value)
        }} type="text" />

      </header>
      <main>
        <UserList
          changeSorting={handleChangeSort}
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}/>
      </main>
    </>
  )
}

export default App

// Options process:

// const sortedUsers = useMemo(() => {
//   // console.log('sortUsers')

//   if (sorting === SortBy.NONE) return filteredUsers

//   const compareProperties: Record<string, (user: User) => any> = {
//     [SortBy.COUNTRY]: user => user.location.country,
//     [SortBy.NAME]: user => user.name.first,
//     [SortBy.LAST]: user => user.name.last
//   }

//   return filteredUsers.toSorted((a, b) => {
//     const extractProperty = compareProperties[sorting]
//     return extractProperty(a).localCompare(extractProperty(b))
//   })
// }, [filteredUsers, sorting])

// const sortedUsers = useMemo(() => {
//   // console.log('sortUsers')
//   return sorting === SortBy.COUNTRY
//     ? filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
//     : filteredUsers
// }, [filteredUsers, sorting])

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
