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

  useEffect(() => {
    dispatch(getDashboards());
  }, [dispatch]);

  useEffect(() => {}, [dashboards]);

  const { loading } = useSelector((state) => state.auth);
  const [showDashboard, setShowDashboard] = useState(false);

  return loading ? (
    <Spinner />
  ) : (
    <div className='home-page'>
      <div className='top-bar'>
        <div
          className='margin-left-2 top-bar-button'
          onMouseEnter={() => setShowDashboard(true)}
          onMouseLeave={() => setShowDashboard(false)}
        >
          <span className='icon-material'>add</span>
          <span>Add new dashboard</span>
          <Card
            title={'Add new dashboard'}
            style={{ display: showDashboard ? 'block' : 'none' }}
          ></Card>
        </div>

        <button className='margin-left-2 top-bar-button'>Add new layout</button>
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
