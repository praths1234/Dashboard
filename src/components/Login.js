import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const res = await axios.post('http://localhost:4000/users/login', user);

      // No need to call res.json() because Axios already parses the response
      if (res.data.email) {
        alert('Logged in Successfully');
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/');
      } else {
        alert("User not found");
      }
    } catch (err) {
      console.error(err.response.data);
      setMessage('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h3>Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
              {message && <div className="mt-3 alert alert-info">{message}</div>}
            </div>
            <div className="card-footer text-center">
              <small>Don't have an account? <a href="http://localhost:3001/signup#">Sign up</a></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
