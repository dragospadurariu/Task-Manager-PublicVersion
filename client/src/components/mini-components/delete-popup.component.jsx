import React from 'react';
import './delete-popup.styles.scss';

const DeletePopUp = ({ setDeletePopup, deleteElement, message, id }) => {
  return (
    <div className='delete-popup-container'>
      <div className='delete-popup-innercontainer'>
        <div className='delete-popup-title'>{message}</div>

        <div className='delete-popup-buttons'>
          <button
            className='btn btn-light'
            onClick={() => setDeletePopup((prevState) => !prevState)}
          >
            Cancel
          </button>

          <button className='btn btn-danger' onClick={() => deleteElement(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
