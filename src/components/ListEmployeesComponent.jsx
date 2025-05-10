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
                        employees.map(employee =>
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
        </div>
    )
}

export default ListEmployeesComponent