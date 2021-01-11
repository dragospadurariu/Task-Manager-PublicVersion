import React, { useState, useContext, useEffect, useRef } from 'react';
import './task-window.styles.scss';
import DatePicker from 'react-datepicker';
import './date-picker.styles.scss';
import TaskTitle from './task-title.component';
import TaskDescription from './task-description.component';
import TaskComments from './task-comments.component';
import { TaskContext } from '../context/TaskContext';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { updateTask, deleteTaskAction } from '../../actions/task.action';

const TaskWindow = ({ setShowTaskWindow }) => {
  const dispatch = useDispatch();
  const task = useContext(TaskContext);
  const creationDate = task.createdAt;

  //Task States
  const [description, setDescription] = useState(task.description);
  const [taskTitle, setTaskTitle] = useState(task.name);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate) : null
  );

  //Use Ref because state value dispatched on unmount will be the state value during the initial mount due to closure.
  const taskTitleRef = useRef(taskTitle);
  const taskDescriptionRef = useRef(description);
  const taskDueDateRef = useRef(dueDate);

  useEffect(() => {
    taskTitleRef.current = taskTitle;
    taskDescriptionRef.current = description;
    taskDueDateRef.current = dueDate;
  }, [taskTitle, description, dueDate]);

  useEffect(() => {
    return () => {
      if (
        taskTitleRef.current !== task.name ||
        taskDescriptionRef.current !== task.description ||
        taskDueDateRef.current?.getTime() !== new Date(task.dueDate)?.getTime()
      ) {
        const updatedTask = {
          name: taskTitleRef.current,
          description: taskDescriptionRef.current,
          dueDate: taskDueDateRef.current,
        };
        dispatch(updateTask(task._id, updatedTask));
      }
    };
  }, [dispatch, task.name, task.description, task.dueDate, task._id]);

  const deleteTask = () => {
    dispatch(deleteTaskAction(task._id));
  };

  return (
    <div className='task-window'>
      <div className='task-window-container'>
        <TaskTitle taskTitle={taskTitle} setTaskTitle={setTaskTitle} />
        <div className='task-window-main'>
          <TaskDescription
            description={description}
            setDescription={setDescription}
          />
          <TaskComments comments={task.comments} taskId={task._id} />
        </div>
        <div className='task-window-sidebar'>
          <div className='task-window-date'>
            <span className='task-window-date-title'>
              <span className='icon-material task-window-date-icon'>
                calendar_today
              </span>
              Creation date
            </span>
            <div className='task-window-creation-date-timestamp-container'>
              <span className='task-window-date-timestamp'>
                <Moment date={creationDate} format='MMMM DD, yyyy' />
              </span>
            </div>
          </div>
          <div className='task-window--date'>
            <span className='task-window-date-title'>
              <span className='icon-material task-window-date-icon'>
                access_alarm
              </span>
              Due date
            </span>
            <DatePicker
              dateFormat='MMMM dd, yyyy'
              onChange={(date) => setDueDate(date)}
              selected={dueDate}
              placeholderText='Due Date'
            />
          </div>
        </div>
        <footer className='task-window-footer'>
          <button
            className='btn btn-danger'
            onClick={() => {
              deleteTask();
              setShowTaskWindow((prevState) => !prevState);
            }}
          >
            Delete
          </button>
          <button
            className='btn'
            onClick={() => {
              setShowTaskWindow((prevState) => !prevState);
            }}
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default TaskWindow;
