import React, { useState } from 'react';
import TaskWindow from './task-window.component';
import './task.styles.scss';
import Modal from 'react-modal';
import { modalStyles } from '../utils/modal.style';
import { deleteTaskAction } from '../../actions/task.action';
import { useDispatch } from 'react-redux';

const Task = ({ name, id, taskObject }) => {
  const [showTaskWindow, setShowTaskWindow] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='task-container'>
      {name}
      <span
        className='icon-material task-icon-edit'
        onClick={() => setShowTaskWindow((prevState) => !prevState)}
      >
        edit
      </span>
      <span
        className='icon-material task-icon-delete'
        onClick={() => dispatch(deleteTaskAction(id))}
      >
        delete
      </span>
      <Modal
        ariaHideApp={false}
        className='task-window-modal'
        isOpen={showTaskWindow}
        style={modalStyles}
      >
        <TaskWindow
          setShowTaskWindow={setShowTaskWindow}
          id={id}
          taskObject={taskObject}
        />
      </Modal>
    </div>
  );
};

export default Task;
