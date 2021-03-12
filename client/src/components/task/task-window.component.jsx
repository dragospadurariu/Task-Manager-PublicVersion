import React, { useState, useContext, useEffect, useRef } from 'react';
import './task-window.styles.scss';
import DatePicker from 'react-datepicker';
import './date-picker.styles.scss';
import TaskTitle from './task-title.component';
import TaskDescription from './task-description.component';
import TaskComments from './task-comments.component';
import { TaskContext } from '../context/TaskContext';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask, deleteTaskAction } from '../../actions/task.action';

const TaskWindow = ({ setShowTaskWindow }) => {
  const dispatch = useDispatch();
  const { labels } = useSelector((state) => state.labelReducer);

  const task = useContext(TaskContext);
  const creationDate = task.createdAt;

  //Task States
  const [description, setDescription] = useState(task.description);
  const [taskTitle, setTaskTitle] = useState(task.name);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate) : null
  );

  const [showLabelDropdown, setShowLabelDropdown] = useState(false);
  //Use Ref because state value dispatched on unmount will be the state value during the initial mount due to closure.
  const taskTitleRef = useRef(taskTitle);
  const taskDescriptionRef = useRef(description);
  const taskDueDateRef = useRef(dueDate);

  useEffect(() => {
    taskTitleRef.current = taskTitle;
    taskDescriptionRef.current = description;
    taskDueDateRef.current = dueDate;
  }, [taskTitle, description, dueDate]);

  const getLabelName = () => {
    return task.label === null
      ? 'Set Label'
      : labels.find((label) => label._id == task.label)?.name == null
      ? 'Set label'
      : labels.find((label) => label._id == task.label)?.name;
  };

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
        <TaskTitle
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          className='text-large'
        />
        <div className='task-window-main'>
          <TaskDescription
            description={description}
            setDescription={setDescription}
          />
          <TaskComments
            comments={task.comments}
            taskId={task._id}
            name={task.owner.name}
            email={task.owner.email}
          />
        </div>
        {/* Sidebar  */}
        <div className='task-window-sidebar'>
          {/* Creation Date  */}
          <div className='task-window-date'>
            <span className='task-window-date-title text-medium'>
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
          {/* Due Date  */}
          <div className='task-window-date'>
            <span className='task-window-date-title text-medium'>
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
          {/* Label List  */}
          <div
            className='task-window-labels'
            onMouseEnter={() => setShowLabelDropdown(true)}
            onMouseLeave={() => setShowLabelDropdown(false)}
          >
            <span className='task-window-labels-title text-medium'>
              <span className='icon-material task-window-date-icon'>
                list_alt
              </span>
              {getLabelName()}
            </span>

            {showLabelDropdown && (
              <div className='task-window-labels-dropdown'>
                {labels.length > 0 ? (
                  <React.Fragment>
                    <div
                      className='task-window-labels-dropdown-row'
                      onClick={() => {
                        dispatch(updateTask(task._id, { label: null }));
                      }}
                    >
                      {`No label`}
                      <span className='task-window-labels-dropdown-color'></span>
                    </div>
                    {labels.map((label) => {
                      return (
                        <div
                          className='task-window-labels-dropdown-row'
                          onClick={() => {
                            setShowLabelDropdown(false);
                            dispatch(
                              updateTask(task._id, { label: label._id })
                            );
                          }}
                          key={label._id}
                        >
                          {label.name}
                          <span
                            className='task-window-labels-dropdown-color'
                            style={{ backgroundColor: `${label.colorCode}` }}
                          ></span>
                        </div>
                      );
                    })}
                  </React.Fragment>
                ) : (
                  <div className='task-window-labels-dropdown-row'>
                    No label created
                  </div>
                )}
              </div>
            )}
          </div>
          {/* End SideBar */}
        </div>

        {/* Footer */}
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
