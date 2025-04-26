import { FC, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

type UserDataType = Partial<{
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
}>

const userData: UserDataType = {
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  password: '',
}

const UserForm: FC = () => {
  const [formData, setFormData] = useState(userData)
  const [usersData, setUsersData] = useState<UserDataType[] | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const key = event.target.name
    const value = event.target.value
    const newObj = {...formData, [key]: value}
    setFormData(newObj)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try {
      await axios.post('api/users/register', formData)
      alert('Регистрация пользователя прошла успешно!')
    } catch (error: any) {
      console.error(error)
      const message = error.response?.data?.message || 'Произошла ошибка при регистрации пользователя!';
      alert(message)
    }
  }

  const getData = async () => {
    const response = await axios.get('api/users/')
    setUsersData(response.data)
    console.log(response.data)
  }

  return (
    <div className='userForm'>
      <form onSubmit={handleSubmit}>
        <input name="lastName" placeholder='Фамилия' onChange={handleChange} required />
        <input name="firstName" placeholder='Имя' onChange={handleChange} required />
        <input name="middleName" placeholder='Отчество' onChange={handleChange} required />
        <input name="email" placeholder='email' onChange={handleChange} required />
        <input type="password" name="password" placeholder='пароль' onChange={handleChange} required />
        <button type='submit'>Зарегистрироваться</button>
      </form>
      <button onClick={getData}>показать пользователей</button>
      <div className="out">
        {usersData instanceof Array && usersData?.map(user => {
          return (
            <div className='user' key={user.email}>
              <p>{user.lastName}</p>
              <p>{user.firstName}</p>
              <p>{user.middleName}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default UserForm;