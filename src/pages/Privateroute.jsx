import {Navigate,Outlet} from "react-router-dom";

const PrivateRoute = () => {

    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")):false;
    const code = new URLSearchParams(window.location.search).get("code");

       
    
       return  code || token  ? <Outlet/> : <Navigate to="/login"/>


}

export default PrivateRoute;