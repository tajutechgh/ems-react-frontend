import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/departments';

export const listDepartments = () => axios.get(REST_API_BASE_URL + "/all");

export const createDepartment = (department) => axios.post(REST_API_BASE_URL + "/create", department);

export const getDepartment = (departmentId) => axios.get(REST_API_BASE_URL + '/get/' + departmentId);

export const updateDepartment = (departmentId, department) => axios.put(REST_API_BASE_URL + '/update/' + departmentId, department);

export const deleteDepartment = (departmentId) => axios.delete(REST_API_BASE_URL + '/delete/' + departmentId);