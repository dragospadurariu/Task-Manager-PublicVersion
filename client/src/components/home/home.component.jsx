import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboards } from '../../actions/data.action';
import Spinner from '../layout/spinner/spinner.layout';
import Card from '../mini-components/card.component';
import DashboardCard from '../mini-components/dashboard-card.component';
import './home.styles.scss';

const Home = () => {
  const dispatch = useDispatch();

  const { dashboards } = useSelector((state) => state.data);
  const { loading: loadingUser } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncUseEffect = async () => {
      await dispatch(getDashboards());
      setLoading(false);
    };
    asyncUseEffect();
  }, [dispatch, loading]);

  useEffect(() => {}, [dashboards]);

  const [showDashboard, setShowDashboard] = useState(false);
  return loadingUser || loading ? (
    <Spinner />
  ) : (
    <div className='home-page'>
      <div className='top-bar'>
        <section className='center-elements'>
          <div
            className='margin-left-2 top-bar-button card-first'
            onMouseEnter={() => setShowDashboard(true)}
            onMouseLeave={() => setShowDashboard(false)}
          >
            <span className='icon-material'>add</span>
            <span>Add new dashboard</span>
            <Card
              title={'Add new dashboard'}
              // useStyle={transition}
              style={{ display: showDashboard ? 'block' : 'none' }}
            ></Card>
          </div>
        </section>

        {/* <button className='margin-left-2 top-bar-button'>Add new layout</button> */}
      </div>
      <div className='dashboards-container'>
        {dashboards.map((dashboard) => {
          return (
            <DashboardCard
              title={dashboard.name}
              key={dashboard._id}
              id={dashboard._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
