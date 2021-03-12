import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Alert from '../layout/alert/alert.layout';
import { setAlert } from '../../actions/alert.action';
import './card.styles.scss';
import './lable-card.styles.scss';
import { CirclePicker } from 'react-color';
import { addLabel } from '../../actions/label.actions';

const LableCard = ({ title, style, dashboardId }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [color, setColor] = useState();

  const handleChange = (color) => {
    setColor(color);
  };

  const onClick = (name) => {
    if (name === '') {
      return dispatch(setAlert('The name is mandatory.', 'danger'));
    }
    if (color == null || undefined) {
      return dispatch(setAlert('The color is mandatory.', 'danger'));
    }
    console.log(color);

    dispatch(addLabel(name, color.hex, dashboardId));

    setName('');
    setColor();
  };

  const onChange = (event) => {
    setName(event.target.value);
  };
  return (
    <div className='card card-second' style={style}>
      <div className='card-container'>
        <span className='card-title'>{title}</span>
        <div className='card-data'>
          <span className='data-name'>Name</span>
          <input
            type='text'
            className='data-input'
            value={name}
            onChange={(event) => onChange(event)}
          />
        </div>
        <div className='create_label_container_select-color'>
          <span>Select a color </span>
          <div className='create_label_container_select-color_container'>
            <CirclePicker color={color} onChangeComplete={handleChange} />
          </div>
        </div>
        <div className='card-action'>
          <Alert />
          <button
            className='btn btn-tertiary margin-top-10 card-action-button'
            onClick={() => onClick(name)}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default LableCard;
