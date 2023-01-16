import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createMotorcycle } from '../../redux/motorcycles/motorcycles';

const AddMotorcycle = () => {
  const getData = {
    model: '',
    price: 0,
    duration_months: 0,
    description: '',
    image: '',
  };
  const [formData, setFormData] = useState(getData);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const imageHandle = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const navigate = useNavigate();
  const submitHandle = (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append('motors[model]', formData.model);
    newFormData.append('motors[price]', formData.price);
    newFormData.append('motors[duration_months]', formData.duration_months);
    newFormData.append('motors[description]', formData.description);
    newFormData.append('motors[image]', formData.image);
    dispatch(createMotorcycle(newFormData, currentUser.currentUser.id));
    navigate('/home');
  };

  return (
    <div className="main">
      <h2 className="text-center">Add your Motor</h2>

      <form onSubmit={(e) => submitHandle(e)} className="form">
        <label className="form-label" htmlFor="model">
          Model
          <input
            type="text"
            name="model"
            className="form-control"
            value={formData.model}
            onChange={handleChange}
            placeholder="Your model.."
            id="model"
            required
          />
        </label>
        <label className="form-label mt-3" htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            placeholder="Your price"
            id="price"
            required
          />
        </label>
        <label className="form-label mt-3" htmlFor="duration">
          Duration
          <input
            type="number"
            name="duration_months"
            className="form-control"
            value={formData.duration_months}
            onChange={handleChange}
            placeholder="Number of months"
            id="duration"
            required
          />
        </label>
        <label className="form-label mt-3" htmlFor="description">
          Description
          <textarea
            name="description"
            value={formData.description}
            className="form-control"
            onChange={handleChange}
            placeholder="Your description.."
            id="description"
            required
          />
        </label>
        <label className="form-label" htmlFor="image">
          Image
          <input
            type="file"
            id="image"
            name="image"
            accept="image/png, image/jpeg"
            className="form-control"
            onChange={imageHandle}
          />
        </label>
        <div className="d-flex">
          <button type="submit" className="btn btn-primary mt-3" id="submit">
            Add to the Database
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMotorcycle;
