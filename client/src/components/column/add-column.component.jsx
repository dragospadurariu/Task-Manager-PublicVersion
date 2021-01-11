import React, { useState } from 'react';
import { addColumn } from '../../actions/column.action';
import './column.styles.scss';
import { useDispatch } from 'react-redux';

const AddColumn = ({ dashboardID }) => {
  const [showInputField, setShowInputField] = useState(false);
  const [columnName, setColumnName] = useState('');
  const dispatch = useDispatch();
  const addNewColumn = () => {
    dispatch(addColumn(dashboardID, columnName));
  };

  return (
    <div className='column'>
      <div
        className='column-header'
        style={{ backgroundColor: 'var(--secondary-color)' }}
      >
        <div className='column-header-text' style={{ marginRight: 'auto' }}>
          Add column
        </div>
        <div className='column-header-add'>
          <span
            className='icon-material'
            style={{ fontSize: '1.7rem', marginRight: '.5rem' }}
            onClick={() => {
              setShowInputField((prevState) => !prevState);
            }}
          >
            add
          </span>
        </div>
        <div className='column-header-more'>
          <span className='icon-material' style={{ fontSize: '1.7rem' }}>
            more_horiz
          </span>
        </div>
        {showInputField && (
          <div className='column-header-add-container'>
            <input
              className='column-header-input'
              style={{
                backgroundColor: 'var(--light-color)',
                color: 'var(--primary-color)',
              }}
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
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
            <button className='btn btn-success' onClick={() => addNewColumn()}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddColumn;
