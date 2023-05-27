import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { UserList } from './components/UserList'

function App() {
  const [users, setUsers] = useState<User[]>([])

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

  return (
    <>
      <h1>Lista de usuarios</h1>
      <UserList users={users}/>
    </>
  )
}

export default App
