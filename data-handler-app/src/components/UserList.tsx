import { type User } from '../types.d'

interface Props {
  users: User[]
  showColors: boolean
  deleteUser: (email: string) => void
}

export const UserList = ({ users, showColors, deleteUser }: Props) => {
  return (
    <table width='100%'>
        <thead>
            <tr>
                <th>Foto</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Pais</th>
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
