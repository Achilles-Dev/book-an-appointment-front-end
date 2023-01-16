import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/auth/index';

const SignUpPage = () => {
  const token = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading === false && token === null) {
      setTimeout(() => {
        setMessage('User already exists, sign_in to continue');
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
    dispatch(signup(user));
    if (loading === true) {
      setMessage('Loading... Please wait');
      setLoading(false);
    } else if (loading === false && token !== null) {
      navigate('/home');
    }
  };

  const handleOnChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <>
      <div className="container mt-5 ml-1 col-sm-6">
        <p className="text-danger p-3">{message}</p>
        <form onSubmit={handleSubmit} className="form m-2">
          <h3 className="text-center">
            SignUp
          </h3>
          <div className="mb-3">
            <input
              className="form-control"
              type="text"
              name="username"
              placeholder="User name"
              onChange={handleOnChange}
              value={username}
            />
          </div>
          <button className="btn btn-success" type="submit">Signup</button>
          {message !== '' ? (
            <Link to="/signin" className="btn btn-success mt-3">
              Login
            </Link>
          ) : ''}
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
