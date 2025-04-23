import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderComponent = () => {
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
              <li className="nav-item">
                <NavLink className="nav-link active" to="/employees">Employees</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/departments">Departments</NavLink>
              </li>
            </ul>
          </div>
        </div>
    </nav>
  )
}

export default HeaderComponent