import React, { useState, useEffect } from 'react'
import { listDepartments, deleteDepartment } from '../services/DepartmentService';
import { useNavigate } from 'react-router-dom';

const ListDepartmentsComponent = () => {

      const [departments, setDepartments] = useState([]);

      const navigator = useNavigate();

      //pagination
      const [currentPage, setCurrentPage] = useState(1);
      const departmentsPerPage = 10;
      const lastIndex = currentPage * departmentsPerPage;
      const firstIndex = lastIndex - departmentsPerPage;
      const records = departments.slice(firstIndex, lastIndex);
      const npages = Math.ceil(departments.length / departmentsPerPage);
      const pageNumbers = [...Array(npages + 1).keys()].slice(1);
      //end pagination

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
                              records.map( department => 
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

export default ListDepartmentsComponent
