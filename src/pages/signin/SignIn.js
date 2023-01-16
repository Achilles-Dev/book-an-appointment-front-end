import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/auth/index';

const SignInPage = () => {
  const token = useSelector((state) => state.auth.token);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading === false && token === null) {
      setTimeout(() => {
        setMessage('User is not registered, Register user to continue');
      }, 2000);
    }
    setTimeout(() => {
      setMessage('');
    }, 5000);
  }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: username,
    };
    dispatch(login(user));
    if (loading === true) {
      setMessage('Loading... Please wait');
      setLoading(false);
    } else if (loading === false && token !== null) {
      navigate('/home');
    }
  };

  return (
    <>
      <div className="container mt-5 ml-1 col-sm-6">
        <p className="text-danger p-3">{message}</p>
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <h3 className="text-center">
            LogIn
          </h3>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="User name"
              onChange={handleChange}
              value={username}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Login
          </button>
          {message !== '' ? (
            <Link to="/signup" className="btn btn-success mt-3">
              Signup
            </Link>
          ) : ''}
        </form>
      </div>
    </>
  );
};

export default SignInPage;
