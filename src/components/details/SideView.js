import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faGear } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SideView = (props) => {
  const { motorcycle } = props;

  const deposit = motorcycle.price * 0.05;

  const serviceFee = motorcycle.price * 0.01;

  const financeFee = motorcycle.price * 0.03;

  const totalPayable = (financeFee + serviceFee + motorcycle.price) - deposit;

  return (
    <div className="w-100">
      <h2 className="d-flex justify-content-end pt-5 mt-5 mb-0">{motorcycle.model}</h2>
      <p className="d-flex justify-content-end mb-4">
        $
        {deposit.toFixed(2)}
        {' '}
        deposit to be made
      </p>
      <table className="table table-striped">
        <tbody className="table-body">
          <tr>
            <td>Finance fee</td>
            <td>
              $
              {financeFee.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>Service fee</td>
            <td>
              $
              {serviceFee.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>Total amount payable</td>
            <td>
              $
              {totalPayable.toFixed(2)}
            </td>
          </tr>
          <tr>
            <td>Duration</td>
            <td>
              {motorcycle.duration_months}
              months
            </td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-center mt-5 pt-5 ">
        <Link to="/reserve/add" state={{ motorId: motorcycle.id }} className="d-flex justify-content-between p-2 w-75 text-white reserve-button">
          <FontAwesomeIcon icon={faGear} fontSize="20px" />
          Reserve
          <FontAwesomeIcon icon={faArrowCircleRight} fontSize="20px" />
        </Link>
      </div>
    </div>
  );
};

SideView.propTypes = {
  motorcycle: PropTypes.arrayOf.isRequired,
};

export default SideView;
