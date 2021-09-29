import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";
import Nuevo from "./components/Nuevo";
import AuthService from "./services/auth.service";
import TutorialsList from "./components/TutorialsList";
import Update from "./components/Update";
import Login from "./services/login.component";
import Register from "./services/register.component";
import Profile from "./services/profile.component";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  const[showModeratorBoard,setShowModeratorBoard]=useState(false);
  const[showAdminBoard,setShowAdminBoard]=useState(false);
  const[showUserBoard,setShowUserBoard]=useState(false);
  const[currentUser,setCurrentUser]=useState(undefined)

  useEffect(() => {
    const user= AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      setShowModeratorBoard(user.roles.includes("ROLE_ADMIN"));
     
    }
  }, []);
  const logOut=()=> {
    AuthService.logout();
    history.push("/tutorials")
   window.location.reload()
  }
  return (
    <div>

      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          Juzgado II
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Infracciones
            </Link>
          </li>

          {showAdminBoard &&<li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Nuevo
            </Link>
          </li> }
        </div>
      
      {currentUser? (
           
               <div className="navbar-nav ml-auto">
               <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                {currentUser.username}
                </Link>
                </li>
                <li className="nav-item">
                <Link to={"/login"} className="nav-link" onClick={logOut} >
                Cerrar sesión
                </Link>
                </li>
               </div>
            
        ):(
          
            <div className="navbar-nav ml-auto">
               <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                Login
                </Link>
                </li>
                <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                Registrate
                </Link>
                </li>
               </div>
         
        )}
        </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route exact path="/add" component={Nuevo} />
          <Route path="/tutorials/:id" component={Update} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </div>
  );                
}

export default App;
