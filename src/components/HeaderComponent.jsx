import React from 'react'

const HeaderComponent = () => {
  return (
    <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container">
            <a className="navbar-brand" href="http://localhost:3000/employees">
              Employee Management System
            </a>  
        </div>
    </nav>
  )
}

export default HeaderComponent