import React from "react";
import { Link , useNavigate } from "react-router-dom";
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }
    return(
        <div>
          {auth ?  <ul className="nav_list">
                <li><Link to="/" >Dashboard</Link></li>
                <li><Link to="/addProduct" >Add Product</Link></li>
                <li><Link to="/my-products">My Products</Link></li>
                <li><Link to="/order">Order</Link></li>
                <li><Link to="/wallet">Wallet</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to='/signup'>Logout</Link></li>
            </ul>
            :
            <ul className="nav_list nav_right">
                <li><Link to="/signup" >Signup</Link></li>
                <li><Link to="/login" >Login</Link></li>
            </ul>
            }
        </div>
    )
}
export default Nav;