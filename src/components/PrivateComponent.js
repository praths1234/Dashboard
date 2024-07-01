import React from "react";
import { Outlet , Navigate } from "react-router-dom";

const PrivateComponent = () => {
   // const [authenticated , setAuthenticated] = useState(!!localStorage.getItem('user'));
   //let auth = {'token' : false}
   const auth = localStorage.getItem('user');
    return auth?<Outlet /> : <Navigate to={'/signup'} />
}
export default PrivateComponent;