import React, { useState } from 'react';
import './dashboard-popup.styles.scss';
import { useDispatch } from 'react-redux';
import {
  changeDashboardName,
  deleteDashboard,
} from '../../actions/data.action';
import Alert from '../layout/alert/alert.layout';
import { setAlert } from '../../actions/alert.action';
import DeletePopUp from './delete-popup.component';
import { deleteLabel, updateLabel } from '../../actions/label.actions';

const LabelPopup = ({ labelData, setShowLabelPopup }) => {
  const { title, id } = labelData;

  const [name, setName] = useState(title);
  const dispatch = useDispatch();

  const onChange = (event) => {
    setName(event.target.value);
  };

  const saveChanges = async () => {
    if (!name) {
      return dispatch(setAlert('The name field is mandatory', 'danger'));
    }
    await dispatch(updateLabel(name, id));
    setShowLabelPopup((prevState) => !prevState);
  };

  return (
    <div className='dashboard-popup-container'>
      <div className='dashboard-popup-innercontainer'>
        <span className='dashboard-popup-title'>{title}</span>
        <div className='dashboard-popup-rename'>
          <span className='dashboard-popup-rename-title'>Rename</span>
          <input
            className='dashboard-popup-rename-input'
            value={name}
            onChange={(event) => onChange(event)}
            required={true}
          ></input>
        </div>
        <Alert />

        <div className='dashboard-popup-buttons'>
          <button
            className='btn btn-light card-action-button'
            onClick={() => setShowLabelPopup((prevState) => !prevState)}
          >
            Cancel
          </button>

          <button
            className='btn btn-danger card-action-button'
            onClick={() => {
              dispatch(deleteLabel(id));
              setShowLabelPopup((prevState) => !prevState);
            }}
          >
            Delete
          </button>

          <button
            className='btn btn-light card-action-button'
            onClick={() => saveChanges()}
          >
            Save
          </button>
        </div>
        {/* {deletePopup && (
          <DeletePopUp
            setDeletePopup={setDeletePopup}
            id={id}
            setShowDashboardPopup={setShowLabelPopup}
            message='Are you sure you want to delete the dashboard?'
            deleteElement={deleteElement}
          />
        )} */}
      </div>
    </div>
  );
};

export default LabelPopup;
