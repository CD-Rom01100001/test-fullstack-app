import { FC } from 'react';
import UserForm from './UserForm';

import './app.css'

const App: FC = () => {
  return (
    <div className="app">
      <h1>Регистрация пользователя</h1>
      <UserForm/>
    </div>
  )
}

export default App;