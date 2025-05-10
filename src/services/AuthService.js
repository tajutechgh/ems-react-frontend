import axios from "axios";

const AUTH_BASE_REST_API_URL = "http://localhost:8080/api/auth";

export function registerUser(registerObject){

      return axios.post(AUTH_BASE_REST_API_URL + "/register", registerObject);
}

export function loginUser(usernameOrEmail, password){

      return axios.post(AUTH_BASE_REST_API_URL + "/login", {usernameOrEmail, password});
}

export function storeToken(token){

      return localStorage.setItem("token", token);
}

export function getToken(){

      return localStorage.getItem("token");
}

export function saveLoggedInUser(username, role){

      sessionStorage.setItem("authenticatedUser", username);

      sessionStorage.setItem("role", role);
}

export function isUserLoggedIn(){

      const username = sessionStorage.getItem("authenticatedUser");

      if(username == null) {
            
            return false;
            
      } else {

            return true;
      }   
}

export function getLoggedInUser(){

      sessionStorage.getItem("authenticatedUser");
}

export function logout(){

      localStorage.clear();
      
      sessionStorage.clear();  
}

export function isAdminUser(){

      let role = sessionStorage.getItem("role");

      if (role != null && role === "Admin") {

            return true
            
      }else{

            return false;
      }
}