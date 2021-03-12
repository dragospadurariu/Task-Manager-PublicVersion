import React, { useState, useEffect, useCallback } from 'react';
import './column.styles.scss';
import Task from '../task/task.component';
import { useSelector, useDispatch } from 'react-redux';
import { addNewTask } from '../../actions/task.action';
import { TaskContext } from '../context/TaskContext';
import EditPopUp from '../mini-components/edit-popup-component';
import Modal from 'react-modal';
import { modalStyles } from '../utils/modal.style';
import { setAlert } from '../../actions/alert.action';
import { deleteColumn, updateColumn } from '../../actions/column.action';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import 'tippy.js/dist/tippy.css';
import ToolTipComponent from '../utils/tooltip.component';
import { useTransition, animated, useSpring } from 'react-spring';

const Column = ({ id, name }) => {
  const [taskName, setTaskName] = useState('');
  const [tasksNumber, setTasksNumber] = useState(0);
  const [showInputField, setShowInputField] = useState(false);
  const { tasks } = useSelector((state) => state.taskReducer);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editPopupData, setEditPopupData] = useState(null);

  const taskTransition = useTransition(tasks, (task) => task._id, {
    from: { opacity: 0, marginLeft: -100, marginRight: 100 },
    enter: { opacity: 1, marginLeft: 0, marginRight: 0 },
    leave: { opacity: 0, marginLeft: -100, marginRight: 100 },
  });

  const dispatch = useDispatch();

  const addTask = () => {
    if (!taskName) return null;

    dispatch(addNewTask(id, taskName));
    setTaskName('');
    setShowInputField(false);
  };

  const getTasksNumber = useCallback(() => {
    const array = tasks.filter((task) => {
      return id === task.column;
    });
    setTasksNumber(parseInt(array.length));
  }, [tasks, id]);

  const changeColumnName = async (name, id) => {
    if (!name) {
      return dispatch(setAlert('The name field is mandatory', 'danger'));
    }
    await dispatch(updateColumn(name, id));
    setShowEditPopup((prevState) => !prevState);
  };

  const [deletePopup, setDeletePopup] = useState(false);
  const deleteMessage = 'Are you sure you want to delete this column?';

  const deleteElement = async (id) => {
    await dispatch(deleteColumn(id));
    setDeletePopup((prevState) => !prevState);
    setEditPopupData(null);
    setShowEditPopup((prevState) => !prevState);
  };

  useEffect(() => {
    getTasksNumber();
  }, [tasks, getTasksNumber]);

  return (
    <div className='column'>
      <div className='column-header'>
        <div className='column-header-text'>{name}</div>
        <div className='column-header-number'>{tasksNumber}</div>
        <div className='column-header-add'>
          <span
            className='icon-material'
            style={{ fontSize: '1.7rem', marginRight: '.5rem' }}
            onClick={() => {
              setShowInputField((prevState) => !prevState);
            }}
          >
            <ToolTipComponent text='Add new task'>
              <span>add</span>
            </ToolTipComponent>
          </span>
        </div>

        <div className='column-header-more'>
          <span
            className='icon-material'
            style={{ fontSize: '1.7rem' }}
            onClick={() => {
              setEditPopupData({ title: name, id });
              setShowEditPopup((prevState) => !prevState);
            }}
          >
            <ToolTipComponent text='Edit column'>
              <span>more_horiz</span>
            </ToolTipComponent>
          </span>
        </div>
        {showInputField && (
          <div className='column-header-add-container'>
            <input
              className='column-header-input'
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            ></input>
            <button
              className='btn btn-tertiary'
              style={{ marginLeft: '25%' }}
              onClick={() => {
                setShowInputField((prevState) => !prevState);
              }}
            >
              Cancel
            </button>
            <button className='btn btn-success' onClick={() => addTask()}>
              Save
            </button>
          </div>
        )}
      </div>

      <Modal
        ariaHideApp={false}
        className='task-window-modal'
        isOpen={showEditPopup}
        style={modalStyles}
      >
        <EditPopUp
          editPopupData={editPopupData}
          setShowEditPopup={setShowEditPopup}
          renameElement={changeColumnName}
          deleteElement={deleteElement}
          deleteMessage={deleteMessage}
        />
      </Modal>
      {/*Drag and Drop Task */}
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className='tasks-wrapper'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {taskTransition.map(({ item, key, props }) => {
              if (item.column === id)
                return (
                  <animated.div key={key} style={props}>
                    <TaskContext.Provider value={item} key={key}>
                      <Draggable draggableId={item._id} index={key}>
                        {(provided) => (
                          <Task
                            name={item.name}
                            taskObject={item}
                            id={item._id}
                            innerRef={provided.innerRef}
                            provided={provided}
                          />
                        )}
                      </Draggable>
                    </TaskContext.Provider>
                  </animated.div>
                );
              return null;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
