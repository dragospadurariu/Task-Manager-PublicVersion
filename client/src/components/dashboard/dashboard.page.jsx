import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getColumnsByDashboardID } from '../../actions/column.action';
import { CLEAR_ALL_COLUMNS } from '../../actions/types';
import AddColumn from '../column/add-column.component';
import Column from '../column/column.component';
import './dashboard.styles.scss';
import { BeatLoader } from 'react-spinners';
import { getTasksByDashboard } from '../../actions/task.action';

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const { columns } = useSelector((state) => state.columns);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getColumnsByDashboardID(id));
      await dispatch(getTasksByDashboard(id));
    };
    getData();
    setLoading(false);
    return dispatch({ type: CLEAR_ALL_COLUMNS });
  }, [dispatch, id]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [columns]);

  return (
    <div className='dashboard'>
      {loading ? (
        <BeatLoader loading={loading} css={'margin: auto'} color={'#e94560'} />
      ) : (
        <Fragment>
          {columns.map((column) => {
            return (
              <Column
                name={column.name}
                key={column._id}
                dashboardID={id}
                id={column._id}
              />
            );
          })}
          <AddColumn dashboardID={id}></AddColumn>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
