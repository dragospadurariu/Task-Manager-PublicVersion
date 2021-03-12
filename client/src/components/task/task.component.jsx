import React, { useState, useEffect } from 'react';
import TaskWindow from './task-window.component';
import './task.styles.scss';
import Modal from 'react-modal';
import { modalStyles } from '../utils/modal.style';
import { deleteTaskAction } from '../../actions/task.action';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import Tooltip from '@material-ui/core/Tooltip';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import 'tippy.js/dist/tippy.css';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import ToolTipComponent from '../utils/tooltip.component';

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '1rem',
        fontFamily: 'inherit',
        whiteSpace: 'pre-line',
      },
    },
  },
});

const Task = ({ name, id, taskObject, provided, innerRef }) => {
  const [showTaskWindow, setShowTaskWindow] = useState(false);
  const colors = ['#009FD4'];

  const dispatch = useDispatch();
  const dueDate = taskObject.dueDate;
  const { labels } = useSelector((state) => state.labelReducer);
  const description = !taskObject.description
    ? 'Description not yet set'
    : taskObject.description;

  const findLabel = (task) => {
    let labelObject = null;
    if (task.label !== null) {
      const label = labels.find((lab) => lab._id === task.label);
      label ? (labelObject = label) : (labelObject = null);
    }

    return labelObject;
  };
  const label = findLabel(taskObject);

  useEffect(() => {
    const checkPastDueDate = () => {
      const dueDateElement = document.getElementById(`due-date-${id}`);
      if (dueDate) {
        const newDueDate = new Date(dueDate);
        const nowDate = Date.now();
        const pastDueDate = newDueDate.getTime() <= nowDate;

        pastDueDate
          ? (dueDateElement.className = 'task-container-duedate outdated')
          : (dueDateElement.className = 'task-container-duedate');

        return pastDueDate;
      } else {
        return false;
      }
    };

    checkPastDueDate();
  }, [dueDate, id]);

  return (
    <div
      className={`task-container task-container-${id}`}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
      // style={{
      //   border: `0.01em solid ${getLabelColorCode(taskObject)}`,
      // }}
    >
      <MuiThemeProvider theme={theme}>
        <Tooltip title={description}>
          <span>{name}</span>
        </Tooltip>
      </MuiThemeProvider>

      <span
        className='icon-material task-icon-edit'
        onClick={() => setShowTaskWindow((prevState) => !prevState)}
      >
        <ToolTipComponent text='Task information window'>
          <span>edit</span>
        </ToolTipComponent>
      </span>

      {/* <span
        className='icon-material task-icon-delete'
        onClick={() => dispatch(deleteTaskAction(id))}
      >
        <ToolTipComponent text='Delete the task'>
          <span>delete</span>
        </ToolTipComponent>
      </span> */}
      <div
        className='task-users-avatar'
        style={{
          backgroundColor: `${
            colors[Math.floor(Math.random() * colors.length)]
          }`,
        }}
      >
        <span className='task-users-avatar-initial'>
          {taskObject.owner.name &&
            taskObject.owner.name
              .split(' ')
              .map((el) => el[0])
              .join('.')
              .toUpperCase()}
        </span>
      </div>
      {label ? (
        <span
          className='task-container-labelname'
          style={{ backgroundColor: `${label.colorCode}` }}
        >
          {label.name}
        </span>
      ) : null}

      {dueDate ? (
        <Moment
          date={dueDate}
          format='MMMM DD, yyyy'
          className='task-container-duedate'
          id={`due-date-${id}`}
        />
      ) : null}
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
