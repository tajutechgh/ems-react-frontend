import React, {useEffect, useState} from 'react'
import {deleteEmployee,listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import { listDepartments } from '../services/DepartmentService'
import { isAdminUser } from '../services/AuthService';

const ListEmployeesComponent = () => {

    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

    const navigator = useNavigate();

    const isAdmin = isAdminUser();

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const employeesPerPage = 10;
    const lastIndex = currentPage * employeesPerPage;
    const firstIndex = lastIndex - employeesPerPage;
    const records = employees.slice(firstIndex, lastIndex);
    const npages = Math.ceil(employees.length / employeesPerPage);
    const pageNumbers = [...Array(npages + 1).keys()].slice(1);
    //end pagination

    useEffect(() => {
    
        listDepartments().then((response) => {

            setDepartments(response.data);

        }).catch(error => {

            console.error(error);
        })

    }, []);

    useEffect(() => {
        getAllEmployees();
    }, [])

    function getAllEmployees() {

        listEmployees().then((response) => {

            setEmployees(response.data);

        }).catch(error => {

            console.error(error);
        })
    }

    function addNewEmployee(){

        navigator('/add-employee')
    }

    function updateEmployee(id) {

        navigator(`/edit-employee/${id}`)
    }

    function removeEmployee(id){

        console.log(id);

        deleteEmployee(id).then((response) =>{

            getAllEmployees();

        }).catch(error => {

            console.error(error);
        })
    }

    function getDepartmentName(id) {
        const dept = departments.find(department => department.id === id);
        return dept ? dept.departmentName : 'Unknown';
    }

    return (
        <div className="container">
            <h2 className="mb-3 mt-3 text-center">List of Employees</h2>

            {
                isAdmin &&
                <button className='btn btn-primary mb-2 bi bi-database-add' onClick={addNewEmployee}> Add Employee</button>                
            }
            
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email Address</th>
                    <th scope="col">Department</th>
                    {
                        isAdmin &&
                        <th scope="col" width="20%">Action</th>
                    }
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map(employee =>
                            <tr key={employee.id}>
                                <th scope="row">{employee.id}</th>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>{getDepartmentName(employee.departmentId)}</td>
                                {
                                    isAdmin &&
                                    <td>
                                        {
                                            isAdmin &&
                                            <button className='btn btn-info bi bi-pencil-square' onClick={() => updateEmployee(employee.id)}> Update</button>
                                        }
                                        {
                                            isAdmin &&
                                            <button className='btn btn-danger bi bi-trash' onClick={() => removeEmployee(employee.id)} style={{marginLeft: '10px'}}> Delete</button>
                                        }
                                    </td>
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                            <a className="page-link" href="#" onClick={prevPage}>Previous</a>
                    </li>
                    {
                            pageNumbers.map((pageNum, index) => (
                                <li className={"page-item ${currentPage === pageNum ? 'active' : ''}"} key={index}>
                                        <a className="page-link" href="#" onClick={() => changeCurrentPage(pageNum)}>{pageNum}</a>
                                </li>
                            ))
                    }
                    <li className="page-item">
                            <a className="page-link" href="#" onClick={nextPage}>Next</a>
                    </li>
                </ul>
            </nav>  
        </div>
    )

    function prevPage() {

        if (currentPage !== 1) {

            setCurrentPage(currentPage - 1);
        }
    }

    function changeCurrentPage(id){
        
        setCurrentPage(id); 
    }

    function nextPage() {

        if (currentPage !== npages) {

            setCurrentPage(currentPage + 1);
        }
    }
}

export default ListEmployeesComponent