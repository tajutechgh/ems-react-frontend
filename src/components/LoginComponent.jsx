import React, {useState} from 'react'
import { loginUser, saveLoggedInUser, storeToken } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {

      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      const navigator = useNavigate();
      
        const [errors, setErrors] = useState({
          username: '',
          password: '',
        });
      
        async function loginNewUser(event) {
      
          event.preventDefault();
      
          if(validateForm()){
      
            const login = {username, password}
            
            console.log(login);
      
            await loginUser(username, password).then((response) => {
                  
                  console.log(response.data);

                  const token = 'Bearer ' + response.data.accessToken;

                  const role = response.data.role;

                  storeToken(token);

                  saveLoggedInUser(username, role);

                  navigator("/employees");

                  window.location.reload(false);
      
            }).catch(error => {
      
                  console.error(error);
            })
          }
        }
      
        function validateForm(){
      
          let valid = true;
      
          const errorsCopy = {... errors}
      
          if(username.trim()){
      
            errorsCopy.username = '';
      
          } else {
      
            errorsCopy.username = 'Username is required';
      
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
                                          <h2 className='text-center'>Login Form</h2>
                                    </div>
                                    <div className='card-body'>
                                          <form>
                                                <div className='row mb-3'>
                                                      <label className='col-md-3 form-label'>Username / Email:</label>
                                                      <div className='col-md-9'>
                                                      <input
                                                      type='text'
                                                      placeholder='Enter username or email'
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
                                                      <button className='btn btn-success bi bi-box-arrow-in-right' onClick={loginNewUser}> Login</button>
                                                </div>
                                          </form>
                                    </div>
                              </div>
                        </div>
                  </div> 
            </div>
      )
}

export default LoginComponent