import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-multi-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMotorcycle, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { fetchMotorcycles } from '../../redux/motorcycles/motorcycles';
import responsive from '../../config/responsive';
import Motor from '../../components/motorcycles/Motor';

const MainPage = () => {
  const motors = useSelector((state) => state.motorcycles.motorcycles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMotorcycles());
  }, []);

  return (
    <div className="main">
      <h2 className="text-center m-4">POWER MOTORS LATEST MODELS</h2>
      <p className="text-center header-text2 m-2">Please select a power models</p>
      <div className="show-motor">
        { motors.length > 0
          ? (
            <Carousel
              autoPlay
              className="w-100"
              keyBoardControl
              responsive={responsive([3, 2, 1])}
            >
              { motors.map((motor) => (
                <Motor key={motor.id} motor={motor} />
              ))}
            </Carousel>
          )
          : (
            <div className="d-flex flex-column justify-content-center align-items-center border mx-auto info p-5">
              <FontAwesomeIcon icon={faCircleInfo} className="text-info h3" />
              <h2 className="w-100 text-center">
                There are no motorcycles
                {' '}
                <FontAwesomeIcon icon={faMotorcycle} />
                {' '}
                available
              </h2>
            </div>
          )}
      </div>
    </div>
  );
};
export default MainPage;
