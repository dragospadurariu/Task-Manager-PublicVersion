const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.middleware');
const Column = require('../models/column.model');
const Dashboard = require('../models/dashboard.model');
const Task = require('../models/task.model');
const ApiError = require('../error/ApiError');

//@route   POST /task/column/:id
//@desc    Createa a new task
//@access  Private
router.post(`/task/column/:id`, auth, async (req, res, next) => {
  const columnId = req.params.id;
  const user = req.user;

  try {
    const dashboard = await Dashboard.findOne({
      users: user,
      columns: columnId,
    });

    if (!dashboard)
      return next(ApiError.badRequest('The column does not exist'));

    const column = await Column.findOne({ _id: columnId });
    if (!column) return next(ApiError.badRequest('The column does not exist'));

    const task = new Task({
      ...req.body,
      column: columnId,
      dashboard: dashboard._id,
      owner: user._id,
    });
    task.save();
    column.tasks.push(task._id);
    column.save();
    await task
      .populate({
        path: 'owner',
      })
      .execPopulate();
    console.log(task);
    res.status(201).send(task);
  } catch (error) {
    next(error);
  }
});

//Get All Tasks by Column ID
router.get('/task/column/:id', auth, async (req, res, next) => {
  const columnId = req.params.id;
  const user = req.user;

  try {
    const dashboard = await Dashboard.findOne({
      users: user,
      columns: columnId,
    });

    if (!dashboard)
      return next(ApiError.badRequest('The column does not exist'));

    const column = await Column.findOne({ _id: columnId });
    if (!column) return next(ApiError.badRequest('The column does not exist'));

    await column.populate('tasks').execPopulate();
    res.status(200).send(column.tasks);
  } catch (error) {
    next(error);
  }
});

//@route   GET /task/dashboard/:id
//@desc    All Tasks by Dashboard ID
//@access  Private
router.get('/task/dashboard/:id', auth, async (req, res, next) => {
  const dashboardID = req.params.id;
  const user = req.user;

  try {
    const dashboard = await Dashboard.findOne({
      users: user,
      _id: dashboardID,
    });

    if (!dashboard)
      return next(ApiError.badRequest('The dashboard does not exist'));

    const tasks = await Task.find({ dashboard: dashboardID }).populate({
      path: 'owner',
    });

    res.status(200).send(tasks);
  } catch (error) {
    next(error);
  }
});

//@route   PATCH /task/:id
//@desc    Update description,name or duedate
//@access  Private
router.patch('/task/:id', auth, async (req, res, next) => {
  const taskId = req.params.id;
  const user = req.user;

  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'name', 'dueDate', 'column', 'label'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return next(ApiError.badRequest('Invalid updates!'));
  }

  try {
    //Find the task
    const task = await Task.findOne({ _id: taskId });
    if (!task) return next(ApiError.badRequest('The task does not exist'));

    //Find the column
    const column = await Column.findOne({ tasks: task });
    if (!column) return next(ApiError.badRequest('The column does not exist'));

    //Find dashboard
    const dashboard = await Dashboard.findOne({ columns: column, users: user });
    if (!dashboard)
      return next(ApiError.badRequest('The dashboard does not exist'));

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    await task.populate({ path: 'owner' }).execPopulate();
    res.status(200).send(task);
  } catch (error) {
    next(error);
  }
});

//@route   POST /task/comments/:id
//@desc    Create a comment for the task
//@access  Private
router.post('/task/comments/:id', auth, async (req, res, next) => {
  const taskId = req.params.id;
  const user = req.user;

  try {
    //Find the task
    const task = await Task.findOne({ _id: taskId });
    if (!task) return next(ApiError.badRequest('The task does not exist'));

    //Find the column
    const column = await Column.findOne({ tasks: task });
    if (!column) return next(ApiError.badRequest('The column does not exist'));

    //Find dashboard
    const dashboard = await Dashboard.findOne({ columns: column, users: user });
    if (!dashboard)
      return next(ApiError.badRequest('The dashboard does not exist'));

    const newComment = {
      owner: task._id,
      text: req.body.text,
      user: { userRef: user._id, username: user.name },
    };

    task.comments.push(newComment);

    await task.save();
    res.status(200).send(task.comments);
  } catch (error) {
    next(error);
  }
});

//@route   Delete /task/comments/:id/:comment_id
//@desc    Delete a comment using taskID and commentID
//@access  Private
router.delete(
  '/task/comments/:id/:comment_id',
  auth,
  async (req, res, next) => {
    const taskId = req.params.id;
    const commentId = req.params.comment_id;
    const user = req.user;

    try {
      const task = await Task.findOne({ _id: taskId, owner: user._id });
      if (!task) return next(ApiError.badRequest('The task does not exist'));

      const taskComment = task.comments.find((comment) => {
        return comment._id == commentId;
      });

      if (!taskComment)
        return next(ApiError.badRequest('The comment does not exist'));

      const taskCommentslist = task.comments.filter(
        (comment) => comment._id != taskComment._id
      );
      task.comments = taskCommentslist;
      await task.save();
      res.status(200).send(task.comments);
    } catch (error) {
      next(error);
    }
  }
);

//@route   Delete /task/:id
//@desc    Delete a task
//@access  Private
router.delete('/task/:id', auth, async (req, res, next) => {
  const taskId = req.params.id;
  const user = req.user;

  try {
    const task = await Task.findOne({ _id: taskId, owner: user._id });
    if (!task) return next(ApiError.badRequest('The task does not exist'));

    await task.delete();
    res.status(200).send(task);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
