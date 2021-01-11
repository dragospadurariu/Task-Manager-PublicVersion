import React, { useState } from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import {
  addTaskComment,
  deleteTaskCommentAction,
} from '../../actions/task.action';

const TaskComments = ({ comments, taskId }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const submitComment = () => {
    console.log(text);
    dispatch(addTaskComment(taskId, text));
  };

  const deleteComment = (commentId) => {
    dispatch(deleteTaskCommentAction(taskId, commentId));
  };

  return (
    <div className='task-window-comments'>
      <span className='task-window-comments-title'>Comments</span>
      {comments.map((comment) => {
        return (
          <div className='task-window-comments-list' key={comment._id}>
            <span className='task-window-comments-timespan'>
              <Moment date={comment.date} format='lll' />
            </span>
            <span className='task-window-comments-text'>{comment.text}</span>
            <span
              className='task-window-comments-delete'
              onClick={() => deleteComment(comment._id)}
            >
              +
            </span>
          </div>
        );
      })}
      <div className='task-window-comments-input-container'>
        <textarea
          placeholder='Add a comment for this task'
          className='task-window-comments-textarea'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className='task-window-comments-save btn btn-success'
          onClick={() => {
            submitComment();
            setText('');
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TaskComments;
