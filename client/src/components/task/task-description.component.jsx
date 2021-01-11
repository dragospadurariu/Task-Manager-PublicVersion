import React, { useState } from 'react';

const TaskDescription = ({ description, setDescription }) => {
  const [showDescriptionArea, setShowDescriptionArea] = useState(false);

  if (description === null) description = '';

  return (
    <div className='task-window-description'>
      <span className='description-header'>Description</span>
      {showDescriptionArea ? (
        <div className='task-description-input-window'>
          <textarea
            className='task-description-input-text'
            style={{ height: '4rem' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className='task-description-input-canel btn'
            onClick={() => setShowDescriptionArea((prevState) => !prevState)}
          >
            Close
          </button>
        </div>
      ) : (
        <div
          className='task-description-text'
          onClick={() => setShowDescriptionArea((prevState) => !prevState)}
        >
          {description}
        </div>
      )}
    </div>
  );
};

export default TaskDescription;
