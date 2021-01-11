import React, { useState } from 'react';
import './dashboard-popup.styles.scss';
import Alert from '../layout/alert/alert.layout';
import DeletePopUp from './delete-popup.component';

const EditPopUp = ({
  editPopupData,
  setShowEditPopup,
  renameElement,
  deleteElement,
  deleteMessage,
}) => {
  const { title, id } = editPopupData;
  const [deletePopup, setDeletePopup] = useState(false);

  const [name, setName] = useState(title);

  const onChange = (event) => {
    setName(event.target.value);
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
            onClick={() => setShowEditPopup((prevState) => !prevState)}
          >
            Cancel
          </button>

          <button
            className='btn btn-danger card-action-button'
            onClick={() => setDeletePopup((prevState) => !prevState)}
          >
            Delete
          </button>

          <button
            className='btn btn-light card-action-button'
            onClick={() => renameElement(name, id)}
          >
            Save
          </button>
        </div>
        {deletePopup && (
          <DeletePopUp
            id={id}
            deleteElement={deleteElement}
            setDeletePopup={setDeletePopup}
            message={deleteMessage}
          />
        )}
      </div>
    </div>
  );
};

export default EditPopUp;
