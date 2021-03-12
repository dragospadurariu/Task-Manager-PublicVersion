import React, { useEffect, useState } from 'react';
import {
  addDashboard,
  addPartipants,
  deletePartipant,
} from '../../actions/data.action';
import './participants-box.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../layout/alert/alert.layout';
import { setAlert } from '../../actions/alert.action';
import validator from 'validator';
import ToolTipComponent from '../utils/tooltip.component';

const ParticipantsBox = ({ title, style, id }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const colors = ['#009FD4'];

  useEffect(() => {});
  const dashboard = useSelector((state) => state.data.dashboards).find(
    (dashb) => dashb._id === id
  );

  const users = dashboard?.users.map((user) => user);
  const me = useSelector((state) => state.auth.user);

  const onChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = () => {
    let isValid = true;
    if (!validator.isEmail(email)) {
      dispatch(setAlert('The email is in wrong format', 'danger'));
      isValid = false;
    }

    if (email === me.user.email) {
      dispatch(setAlert('You cannot add yourself', 'danger'));
      isValid = false;
    }

    return isValid ? dispatch(addPartipants(id, email)) : null;
  };

  return (
    <div className='participants-box' style={style}>
      <div className='participants-box-container'>
        <span className='participants-box-title'>{title}</span>
        <div className='participants-box-data'>
          <span className='data-name'>Email</span>
          <input
            type='text'
            className='data-input'
            value={email}
            onChange={(event) => onChange(event)}
            onKeyDown={(e) => (e.key === 'Enter' ? null : null)}
          />
        </div>
        <div className='participants-box-users'>
          {users
            ? users
                .filter((user) => user._id !== me.user._id)
                .map((user) => {
                  return (
                    <div className='participants-box-users-row' key={user._id}>
                      <div
                        className='participants-box-users-avatar'
                        style={{
                          backgroundColor: `${
                            colors[Math.floor(Math.random() * colors.length)]
                          }`,
                        }}
                      >
                        <ToolTipComponent text={`${user.email}`}>
                          <span className='participants-box-users-initial'>
                            {user.name
                              .split(' ')
                              .map((el) => el[0])
                              .join('.')
                              .toUpperCase()}
                          </span>
                        </ToolTipComponent>
                      </div>
                      {me.user._id === dashboard?.owner ? (
                        <div className='participants-box-users-delete'>
                          <span
                            className='icon-material'
                            style={{ marginRight: '.5rem' }}
                            onClick={() =>
                              dispatch(deletePartipant(id, user._id))
                            }
                          >
                            block
                          </span>
                        </div>
                      ) : null}
                    </div>
                  );
                })
            : null}
        </div>
        <div className='participants-box-action'>
          <Alert />
          <button
            className='btn btn-tertiary margin-top-10 participants-box-action-button'
            onClick={() => onSubmit()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsBox;
