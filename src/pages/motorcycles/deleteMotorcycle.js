import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMotorcycle, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { deleteMotorcycle, fetchMotorcycles } from '../../redux/motorcycles/motorcycles';

const DeleteMotorcycle = () => {
  const motorcycles = useSelector((state) => state.motorcycles.motorcycles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMotorcycles());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteMotorcycle(id));
  };

  return (
    <div className="main">
      {motorcycles.length > 0 ? (
        <>
          <h3 className="text-center">Delete Motorcycle</h3>
          <div className="form">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Price</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="table-body">
                { motorcycles.map((motor) => (
                  <tr key={motor.id}>
                    <td>{motor.model}</td>
                    <td>{motor.price}</td>
                    <td>{motor.duration_months}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(motor.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="d-flex flex-column border mx-auto info p-5">
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
  );
};
export default DeleteMotorcycle;
