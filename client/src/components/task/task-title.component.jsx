import React from 'react';

const TaskTitle = ({ taskTitle, setTaskTitle }) => {
  return (
    <div className='task-window-header'>
      <textarea
        className='task-window-header-textarea text-large'
        spellCheck='false'
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
    </div>
  );
};

export default TaskTitle;
