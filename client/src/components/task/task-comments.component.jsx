import React, { useState } from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import {
  addTaskComment,
  deleteTaskCommentAction,
} from '../../actions/task.action';
import ToolTipComponent from '../utils/tooltip.component';

const TaskComments = ({ comments, taskId, name, email }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const colors = ['#009FD4'];

  const submitComment = () => {
    dispatch(addTaskComment(taskId, text));
  };

  const deleteComment = (commentId) => {
    dispatch(deleteTaskCommentAction(taskId, commentId));
  };

  return (
    <div className='task-window-comments'>
      <span className='task-window-comments-title text-medium'>Comments</span>
      {comments.map((comment) => {
        return (
          <div className='task-window-comments-list' key={comment._id}>
            <div
              className='task-window-comments-avatar'
              style={{
                backgroundColor: `${
                  colors[Math.floor(Math.random() * colors.length)]
                }`,
              }}
            >
              <ToolTipComponent text={`${comment.user.username}`}>
                <span className='task-window-comments-initial'>
                  {comment.user.username
                    .split(' ')
                    .map((el) => el[0])
                    .join('.')
                    .toUpperCase()}
                </span>
              </ToolTipComponent>
            </div>
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              submitComment();
              setText('');
              return;
            }
            return null;
          }}
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
