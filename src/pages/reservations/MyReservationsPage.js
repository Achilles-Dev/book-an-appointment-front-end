import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMotorcycle, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { fetchReservations } from '../../redux/reservations/reservations';
import Reservation from '../../components/Reservations/Reservation';
import { fetchMotorcycles } from '../../redux/motorcycles/motorcycles';

const MyReservationsPage = ({ userId }) => {
  const reservations = useSelector((state) => state.reservations.reservations);
  const motorcycles = useSelector((state) => state.motorcycles.motorcycles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReservations(userId));
  }, [userId]);

  useEffect(() => {
    dispatch(fetchMotorcycles());
  }, [dispatch]);

  return (
    <div className="main">
      { reservations.length > 0
        ? (
          <>
            <h3 className="text-center">My Reservations</h3>
            <div className="form">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Date</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  { reservations.length > 0 && reservations.map((reservation) => (
                    <Reservation
                      key={reservation.id}
                      reservation={reservation}
                      motorcycles={motorcycles}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
        : (
          <div className="d-flex flex-column border mx-auto info p-5">
            <FontAwesomeIcon icon={faCircleInfo} className="text-info h3" />
            <h2 className="w-100 text-center">
              There are no Reservations
              {' '}
              <FontAwesomeIcon icon={faMotorcycle} />
              {' '}
              made
            </h2>
          </div>
        )}
    </div>
  );
};

MyReservationsPage.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default MyReservationsPage;
