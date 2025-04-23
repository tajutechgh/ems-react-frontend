import React, { useState, useEffect } from 'react'
import { listDepartments, deleteDepartment } from '../services/DepartmentService';
import { useNavigate } from 'react-router-dom';

const ListDepartmentsComponent = () => {

      const [departments, setDepartments] = useState([]);

      const navigator = useNavigate();

      useEffect(() => {
            getAllDepartments();
      }, [])

      function getAllDepartments() {
      
            listDepartments().then((response) => {

                  setDepartments(response.data);

            }).catch(error => {

                  console.error(error);
            })
      }

      function addNewDepartment(){

            navigator('/add-department')
      }

      function updateDepartment(id) {
      
            navigator(`/edit-department/${id}`)
      }

      function removeDepartment(id){

            console.log(id);

            deleteDepartment(id).then((response) =>{

                  getAllDepartments();

            }).catch(error => {

                  console.error(error);
            })
      }

      return (
            <div className="container">
                  <h2 className="mb-3 mt-3 text-center">List of Departments</h2>
                  <button className='btn btn-primary mb-2 bi bi-database-add' onClick={addNewDepartment}> Add Department</button>
                  <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                              <th>#</th>
                              <th>Department Name</th>
                              <th>Department Description</th>
                              <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                              departments.map( department => 
                                    <tr key={department.id}>
                                          <td>{department.id}</td>
                                          <td>{department.departmentName}</td>
                                          <td>{department.departmentDescription}</td>
                                          <td width="20%">
                                                <button className='btn btn-info bi bi-pencil-square' onClick={() => updateDepartment(department.id)}> Update</button>
                                                <button className='btn btn-danger bi bi-trash' onClick={() => removeDepartment(department.id)} style={{marginLeft: '10px'}}> Delete</button>
                                          </td>
                                    </tr>
                              )
                        }
                      </tbody>
                  </table>
            </div>
      )
}

export default ListDepartmentsComponent
