import { Button } from "@mui/material";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Loginpage } from "./Loginpage";
import { Registerpage } from "./Registerpage";

export function Home() {
  const navigate=useNavigate()
  return (
    <div className="container-fluid homecont">

      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.png" className="sovicon"></img>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            
              <Button variant="outlined" className="loginbt" onClick={()=>{
                navigate('login')
              }} >Login</Button>
              <Button variant="contained" className="signupbtn" onClick={()=>{
                navigate('register')
              }} >Sign up</Button>
            
          </div>
        </div>
      </nav>

      <Outlet/>

    </div>
  );
}
