import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getColumnsByDashboardID } from '../../actions/column.action';
import { CLEAR_ALL_COLUMNS } from '../../actions/types';
import AddColumn from '../column/add-column.component';
import Column from '../column/column.component';
import './dashboard.styles.scss';
import { BeatLoader } from 'react-spinners';
import { getTasksByDashboard } from '../../actions/task.action';
import { DragDropContext } from 'react-beautiful-dnd';
import { updateTaskOrder } from '../../actions/task.action';
import { getAllLabels } from '../../actions/label.actions';
import { useHistory } from 'react-router';
import { deletePartipant, getDashboards } from '../../actions/data.action';
import { loadUser } from '../../actions/auth.action';
import ParticipantsBox from './participants-box.component';
import LableCard from '../mini-components/lable-card.component';
import LableList from '../mini-components/lable-list.component';
import Spinner from '../layout/spinner/spinner.layout';

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      await dispatch(getColumnsByDashboardID(id));
      await dispatch(getTasksByDashboard(id));
      await dispatch(getDashboards());
      await dispatch(getAllLabels(id));
      await dispatch(loadUser(localStorage.token));
    };
    getData();
    setLoading(false);
    return dispatch({ type: CLEAR_ALL_COLUMNS });
  }, [dispatch, id]);

  const { columns } = useSelector((state) => state.columns);
  const [loading, setLoading] = useState(true);
  const { tasks } = useSelector((state) => state.taskReducer);
  const dashboard = useSelector((state) => state.data.dashboards).find(
    (dashb) => dashb._id === id
  );
  const { user } = useSelector((state) => state.auth);
  const [showParticipantsBox, setShowParticipantsBox] = useState(false);
  const [showAddLable, setShowAddLable] = useState(false);
  const [showLabelList, setShowLabelList] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [columns]);

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return null;

    const updatedTask = tasks.find((item) => item._id === result.draggableId);
    updatedTask.column = result.destination.droppableId;
    const updatedInformation = {
      column: result.destination.droppableId,
    };

    dispatch(
      updateTaskOrder(
        result.draggableId,
        result.draggableId,
        updatedInformation
      )
    );
  };

  return (
    <div className='dashboard'>
      <div className='dashboard-header'>
        <div
          className='top-bar-button'
          onMouseEnter={() => setShowParticipantsBox(true)}
          onMouseLeave={() => setShowParticipantsBox(false)}
          style={{ position: 'relative' }}
        >
          <span className='icon-material' style={{ marginRight: '.5rem' }}>
            person_add
          </span>
          <span className='dashboard-add-participants'> Add participants</span>

          <ParticipantsBox
            title={'Add participants'}
            id={id}
            style={{ display: showParticipantsBox ? 'block' : 'none' }}
          />
        </div>
        {user !== undefined && dashboard !== undefined ? (
          user.user._id !== dashboard?.owner ? (
            <div
              className='top-bar-button'
              style={{ position: 'relative' }}
              onClick={async () => {
                await dispatch(deletePartipant(id, user.user._id));
                history.push('/home');
              }}
            >
              <span className='icon-material' style={{ marginRight: '.5rem' }}>
                highlight_off
              </span>
              <span>Exit dashboard</span>
            </div>
          ) : null
        ) : null}

        <div
          className='margin-left-2 top-bar-button card-second'
          onMouseEnter={() => setShowAddLable(true)}
          onMouseLeave={() => setShowAddLable(false)}
        >
          <span className='icon-material'>add</span>
          <span>Add new lable</span>
          <LableCard
            title={'Add new lable'}
            style={{ display: showAddLable ? 'block' : 'none' }}
            dashboardId={id}
          ></LableCard>
        </div>
        <div
          className='margin-left-2 top-bar-button card-third'
          onMouseEnter={() => setShowLabelList(true)}
          onMouseLeave={() => setShowLabelList(false)}
        >
          <span className='icon-material'>list_alt</span>
          <span>Lable List</span>
          <LableList
            title={'Label list'}
            style={{ display: showLabelList ? 'block' : 'none' }}
          ></LableList>
        </div>
      </div>
      <div className='dashboard-content'>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <DragDropContext onDragEnd={handleOnDragEnd}>
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
            </DragDropContext>
            <AddColumn dashboardID={id}></AddColumn>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
