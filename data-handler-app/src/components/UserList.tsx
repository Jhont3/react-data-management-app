import { SortBy, type User } from '../types.d'

interface Props {
  users: User[]
  showColors: boolean
  deleteUser: (email: string) => void
  changeSorting: (sort: SortBy) => void
}

export const UserList = ({ users, showColors, deleteUser, changeSorting }: Props) => {
  return (
    <table width='100%'>
        <thead>
            <tr>
                <th>Foto</th>
                <th className='pointer' onClick={() => changeSorting(SortBy.NAME)}>Nombre</th>
                <th className='pointer' onClick={() => changeSorting(SortBy.LAST)}>Apellido</th>
                <th className='pointer' onClick={() => changeSorting(SortBy.COUNTRY)}>Pais</th>
                <th>Acciones</th>
            </tr>
        </thead>

        <tbody>
            {
                users.map((user, i) => {
                  const bgColor = i % 2 === 0 ? '#eee' : '#ccc'
                  const onColor = showColors ? bgColor : 'transparent'
                  return (
                    <tr key={user.email} style={{ backgroundColor: onColor }}>
                        <td>
                            <img src={user.picture.thumbnail} alt="user" />
                        </td>
                        <td>{user.name.first}</td>
                        <td>{user.name.last}</td>
                        <td>{user.location.country}</td>
                        <td>
                            <button onClick={() => deleteUser(user.email)}>Borrar</button>
                        </td>
                    </tr>
                  )
                })
            }
        </tbody>
    </table>
  )
}
