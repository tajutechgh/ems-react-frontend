import React from 'react'
import { NavLink } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../services/AuthService';

const HeaderComponent = () => {

  const navigator = useNavigate();

  const isAdmin = isAdminUser();

  function logoutUser(){

      logout();

      navigator('/login');
  }

  const isAuth = isUserLoggedIn();

  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container">
          <a className="navbar-brand" href="http://localhost:3000/employees">
            Employee Management System
          </a>  
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {
                isAuth && 
                <li className="nav-item">
                  <NavLink className="nav-link active" to="/employees">Employees</NavLink>
                </li>
              }
              {
                isAuth && 
                <li className="nav-item">
                  {
                    isAdmin &&
                    <NavLink className="nav-link active" to="/departments">Departments</NavLink>
                  }
                </li>
              }
            </ul>
          </div>
          <ul className="navbar-nav">
            {
              !isAuth &&
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
              </li>
            }
            {
              !isAuth &&
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
              </li>
            }
            {
              isAuth &&
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" onClick={logoutUser}>Logout</NavLink>
              </li>
            }
          </ul>
        </div>
    </nav>
  )
}

export default HeaderComponent