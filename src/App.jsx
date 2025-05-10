// import reactLogo from './assets/react.svg'
import './App.css'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListEmployeesComponent from './components/ListEmployeesComponent'
import ListDepartmentsComponent from './components/ListDepartmentsComponent'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import DepartmentComponent from './components/DepartmentComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'

function App() {

  function AuthenticatedRoute({children}){

    const isAuth = isUserLoggedIn();

    if(isAuth) {

      return children;
    }

    return <Navigate to="/" />

  }

  return (
    <>
    <BrowserRouter>
        <HeaderComponent/>
        <Routes>
          {/* // http://localhost:3000 */}
          <Route path="/" element={<LoginComponent/>}></Route>
          {/* // http://localhost:3000/employees */}
          <Route path='/employees' element = { <AuthenticatedRoute><ListEmployeesComponent/></AuthenticatedRoute> }></Route>
          {/* // http://localhost:3000/add-employee */}
          <Route path='/add-employee' element = { <AuthenticatedRoute><EmployeeComponent/></AuthenticatedRoute>}></Route>
          {/* // http://localhost:3000/edit-employee/1 */}
          <Route path='/edit-employee/:id' element = { <AuthenticatedRoute><EmployeeComponent/></AuthenticatedRoute> }></Route>
          {/* // http://localhost:3000/departments */}
          <Route path='/departments' element = { <AuthenticatedRoute><ListDepartmentsComponent/></AuthenticatedRoute> }></Route>
          {/* // http://localhost:3000/add-department */}
          <Route path='/add-department' element = { <AuthenticatedRoute><DepartmentComponent/></AuthenticatedRoute>}></Route>
          {/* // http://localhost:3000/edit-department/1 */}
          <Route path='/edit-department/:id' element = { <AuthenticatedRoute><DepartmentComponent/></AuthenticatedRoute> }></Route>
          {/* // http://localhost:3000/register */}
          <Route path='/register' element = {<RegisterComponent/>}></Route>
          {/* // http://localhost:3000/login */}
          <Route path='/login' element = {<LoginComponent/>}></Route>
        </Routes>
        <FooterComponent/>
    </BrowserRouter>
    </>
  )
}

export default App
