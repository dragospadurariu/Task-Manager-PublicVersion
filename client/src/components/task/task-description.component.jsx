import React, { useState } from 'react';

const TaskDescription = ({ description, setDescription }) => {
  const [showDescriptionArea, setShowDescriptionArea] = useState(false);

  if (description === null) description = '';

  return (
    <div className='task-window-description'>
      <span className='description-header text-medium'>Description</span>
      {showDescriptionArea ? (
        <div className='task-description-input-window'>
          <textarea
            className='task-description-input-text'
            style={{ height: '4rem' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            // rows='8'
            // cols='60'
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
          <span style={{ display: 'block', whiteSpace: 'pre-line' }}>
            {description}
          </span>
        </div>
      )}
    </div>
  );
};

export default TaskDescription;
