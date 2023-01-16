import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SideView from '../../components/details/SideView';
import { fetchSingleMotorcycle } from '../../redux/motorcycles/motorcycles';

const DetailsPage = () => {
  const motorcycle = useSelector((state) => state.motorcycles.motorcycle);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleMotorcycle(id));
  }, [id]);

  return (
    <div className="main flex-row gap-2 w-75">
      {motorcycle && Object.keys(motorcycle).length > 0
        ? (
          <>
            <section className="d-flex align-items-center details-image">
              <img src={motorcycle.image && motorcycle.image.url} alt="Motorcycle" className="w-100" />
            </section>
            <section className="details-sideview d-flex h-100">
              <SideView motorcycle={motorcycle} />
            </section>
          </>
        )
        : <h2>Invalid Motorcycle ID</h2>}
    </div>

  );
};

export default DetailsPage;
