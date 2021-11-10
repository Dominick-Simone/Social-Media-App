import React, {useState} from 'react'

import { useMutation } from '@apollo/client';

import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
      });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: '',
      password: '',
    });
  };

    return (
        <div className="login">
            <h1 className="loginHeader">Login</h1>
            <form className="loginForm" onSubmit={handleFormSubmit}>
                <label className="loginLabel">Username</label>
                <input type="text" placeholder="Username" className="loginUsernameInput loginInput" name="username" value={formState.username} onChange={handleChange} />
                <label className="loginLabel">Password</label>
                <input type="password" className="loginPasswordInput loginInput" name="password" value={formState.password}
                  onChange={handleChange} />
                <button type="submit" className="loginInput loginFormSubmit" value="Submit">Submit</button>

            </form>
        </div>
    )
}

export default LoginForm
