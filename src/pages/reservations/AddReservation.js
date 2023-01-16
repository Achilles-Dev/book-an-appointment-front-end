import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './AddReservation.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { fetchMotorcycles } from '../../redux/motorcycles/motorcycles';
import { createReservation } from '../../redux/reservations/reservations';

const AddReservation = ({ userId }) => {
  const getData = {
    city: '',
    date: '',
  };
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMotorcycles());
  }, []);
  const motors = useSelector((state) => state.motorcycles.motorcycles);
  const [isOpen, setIsOpen] = useState(true);
  const [reservation, setReservation] = useState(getData);
  const [motorId, setMotorId] = useState();
  const close = () => {
    setIsOpen(false);
    navigate(-1);
  };

  const handleChange = (e) => {
    setReservation(
      {
        ...reservation,
        [e.target.name]: e.target.value,
      },
    );
  };

  useEffect(() => {
    if (location.state !== null) {
      const { motorId } = location.state;
      setMotorId(motorId);
    }
  }, [motorId]);

  const handleMotor = (e) => {
    setMotorId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservation(reservation, userId, motorId));
    navigate('/reservations');
  };
  if (isOpen) {
    return (
      <div className="add-reservation-main-wrap w-100 h-100 mh-100">
        <div className="add-reservation h-100">
          <FontAwesomeIcon icon={faXmark} className="text-light mx-5 h1 cursor" onClick={() => { close(); }} />
          <div className="reserve">
            <h2 className="text-center text-light">Reserve Motorcycle</h2>
            <p className="w-50 text-center text-light mx-auto pb-4">
              Power Motorcycle was founded in 2022 to challenge the perception of
              what an American motorcycle could be.
              Anything that compromises the ride, aesthetics, stance or function
              is treated as an opportunity to innovate
              and improve the design.Power motors owners seek more than just a
              machine.
              They are passionate individuals in search of a completely immersive
              riding experience.
              Every Power Motorcycle is built from an obsession for innovative design,
              engineering excellence and
              dedication to the rider.
            </p>
            <form className="d-flex justify-content-center w-50 mx-auto gap-2" onSubmit={(e) => handleSubmit(e)}>
              {location.state === null
                ? (
                  <select className="form-select" onChange={handleMotor}>
                    <option>-Select motor-</option>
                    {motors.length > 0 && motors.map((motor) => (
                      <option key={motor.id} value={motor.id}>
                        {motor.model}
                      </option>
                    ))}
                  </select>
                )
                : ''}

              <input type="text" name="city" className="form-control" placeholder="City " onChange={handleChange} required />
              <input type="date" name="date" className="form-control" onChange={handleChange} />
              <button className="reserve-btn rounded-pill" type="submit">Reserve</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

AddReservation.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default AddReservation;
