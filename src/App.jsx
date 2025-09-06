
import { useContext, useEffect, useState } from 'react';
import './App.css'
import Login from './components/Auth/Login';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import { getLocalStorage, setLocalStorage } from './utils/LocalStorage';
import { AuthContext } from './context/AuthProvider';

function App() {
  
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const authData = useContext(AuthContext);
  // console.log(authData);

// useEffect(() => {
//   if(authData){
//     const loggedInUser = localStorage.getItem("LoggedInUser")
//     if(loggedInUser){
//       setUser(loggedInUser.role)
//     }
//   }  
// }, [authData]);

 
  const handleLogin =(email,password)=>{
    if(email== "admin@me.com" && password== "12345"){
      setUser("admin")
      localStorage.setItem("LoggedInUser",JSON.stringify({role:'admin'}))
    }
    else if (authData) {
      const employee= authData.employees.find((e)=>email == e.email && e.password == password)
     if(employee){
      setUser("employee");
      setLoggedInUserData(employee)
      localStorage.setItem("LoggedInUser",JSON.stringify({role: "employee"})
      );
     }
     
    }
     else {
      alert("Invalid employee Credentials");
    }
  }



  return (
    <>
    {!user ? <Login handleLogin={handleLogin}/>: ""}
    {user == "admin" ? (<AdminDashboard/>) : (user == "employee"? <EmployeeDashboard data={loggedInUserData}/> : null) }
    </>
  );
}

export default App
