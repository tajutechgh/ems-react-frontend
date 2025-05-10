import React, {useState} from 'react'
import { registerUser } from '../services/AuthService';

const RegisterComponent = () => {

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  function registerNewUser(event) {

    event.preventDefault();

    if(validateForm()){

      const register = {name, username, email, password}
      
      console.log(register);

      registerUser(register).then((response) => {
            
        console.log(response.data);

      }).catch(error => {

        console.error(error);
      })
    }
  }

  function validateForm(){

    let valid = true;

    const errorsCopy = {... errors}

    if(name.trim()){

      errorsCopy.name = '';

    } else {

      errorsCopy.name = 'Name is required';

      valid = false;
    }

    if(username.trim()){

      errorsCopy.username = '';

    } else {

      errorsCopy.username = 'Username is required';

      valid = false;
    }

    if(email.trim()){

      errorsCopy.email = '';

    } else {

      errorsCopy.email = 'Email is required';

      valid = false;
    }

    if(password.trim()){

        errorsCopy.password = '';

    } else {

        errorsCopy.password = 'Password is required';

        valid = false;
    }

    setErrors(errorsCopy);
    
    return valid;

  }

  return (
    <div className='container'>
      <br/><br/>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <div className='card-header'>
              <h2 className='text-center'>Registration Form</h2>
            </div>
            <div className='card-body'>
              <form>
                <div className='row mb-3'>
                  <label className='col-md-3 form-label'>Name:</label>
                  <div className='col-md-9'>
                    <input
                      type='text'
                      placeholder='Enter name'
                      name='name'
                      value={name}
                      className={`form-control ${ errors.name ? 'is-invalid': '' }`}
                      onChange={(event) => setName(event.target.value)}
                    >
                    </input>
                    { errors.name && <div className='invalid-feedback'> { errors.name} </div> }
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className='col-md-3 form-label'>Username:</label>
                  <div className='col-md-9'>
                    <input
                      type='text'
                      placeholder='Enter username'
                      name='username'
                      value={username}
                      className={`form-control ${ errors.username ? 'is-invalid': '' }`}
                      onChange={(event) => setUsername(event.target.value)}
                    >
                    </input>
                    { errors.username && <div className='invalid-feedback'> { errors.username} </div> }
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className='col-md-3 form-label'>Email:</label>
                  <div className='col-md-9'>
                    <input
                      type='email'
                      placeholder='Enter email'
                      name='email'
                      value={email}
                      className={`form-control ${ errors.email ? 'is-invalid': '' }`}
                      onChange={(event) => setEmail(event.target.value)}
                    >
                    </input>
                    { errors.email && <div className='invalid-feedback'> { errors.email} </div> }
                  </div>
                </div>
                <div className='row mb-3'>
                  <label className='col-md-3 form-label'>password:</label>
                  <div className='col-md-9'>
                    <input
                      type='password'
                      placeholder='Enter password'
                      name='password'
                      value={password}
                      className={`form-control ${ errors.password ? 'is-invalid': '' }`}
                      onChange={(event) => setPassword(event.target.value)}
                    >
                    </input>
                    { errors.password && <div className='invalid-feedback'> { errors.password} </div> }
                  </div>
                </div>
                <div className='form-group mb-3'>
                  <button className='btn btn-success bi bi-floppy' onClick={registerNewUser}> Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> 
    </div>
  )
}

export default RegisterComponent