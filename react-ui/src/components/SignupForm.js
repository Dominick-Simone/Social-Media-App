import React, {useState} from 'react'
import { useMutation } from '@apollo/client';

import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
    const [formState, setFormState] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: ''
      });
    const [createUser] = useMutation(CREATE_USER);


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
      const mutationResponse = await createUser({
      variables: {
        username: formState.username,
        email: formState.email,
        password: formState.password,
        first_name: formState.first_name,
        last_name: formState.last_name,
      },
    });
      Auth.login(mutationResponse.data.createUser.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: ''
    });
  };

    return (
        <div className="signUp">
            <h1 className="signUpHeader">Sign Up</h1>
            <form className="signUpForm" onSubmit={handleFormSubmit}>
                <label className="signUpFormLabel">First Name</label>
                <input type="text" placeholder="First Name" className="signUpFirstNameInput signUpFormInput" name="first_name" value={formState.first_name} onChange={handleChange} />
                <label className="signUpFormLabel">Last Name</label>
                <input type="text" placeholder="Last Name" className="signUpLastNameInput signUpFormInput" name="last_name" value={formState.last_name} onChange={handleChange} />
                <label className="signUpFormLabel">Username</label>
                <input type="text" placeholder="Username" className="signUpUsernameInput signUpFormInput" name="username" value={formState.username} onChange={handleChange} />
                <label className="signUpFormLabel">Email</label>
                <input type="email" placeholder="example@email.com" className="signUpEmailInput signUpFormInput" name="email" value={formState.email} onChange={handleChange} />
                <label className="signUpFormLabel">Password</label>
                <input type="password" className="signUpPasswordInput signUpFormInput" name="password" value={formState.password} onChange={handleChange} />
                <button type="submit" className="signUpFormInput signUpFormSubmit" value="Submit">Submit</button>
            </form>
        </div>
    )
}

export default SignupForm
