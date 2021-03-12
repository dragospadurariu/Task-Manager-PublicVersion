const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.middleware');
const Dashboard = require('../models/dashboard.model');
const Column = require('../models/column.model');
const User = require('../models/user.model');
const ApiError = require('../error/ApiError');

//fetch columns by dashboard id
router.get('/columns/dashboard/:dashboardId', auth, async (req, res, next) => {
  const { dashboardId } = req.params;

  try {
    const dashboard = await Dashboard.findOne({
      _id: dashboardId,
      users: req.user,
    });

    if (!dashboard)
      return next(ApiError.badRequest('The dashboard does not exist'));

    await dashboard.populate('columns').execPopulate();
    res.status(200).send(dashboard.columns);
  } catch (error) {
    next(error);
  }
});

//fetch column by column id
router.get('/columns/:columnId', auth, async (req, res, next) => {
  const { columnId } = req.params;

  try {
    const user = req.user;
    const dashboard = await Dashboard.findOne({
      owner: user._id,
      columns: columnId,
    });

    if (!dashboard)
      return next(ApiError.badRequest('The dashboard does not exist'));

    const column = await Column.findOne({ _id: columnId });

    res.send(column);
  } catch (error) {
    next(error);
  }
});

router.post('/columns/:dashboardId', auth, async (req, res, next) => {
  const { dashboardId } = req.params;

  try {
    const column = new Column({
      ...req.body,
      dashboard: dashboardId,
    });

    const dashboard = await Dashboard.findOne({
      _id: dashboardId,
      users: req.user,
    });
    if (!dashboard)
      return next(ApiError.badRequest('The dashboard does not exist'));

    await column.save();
    dashboard.columns.push(column._id);
    await dashboard.save();
    res.status(201).send(column);
  } catch (error) {
    next(error);
  }
});

router.patch('/columns/:id', auth, async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name'];

  const isMatch = updates.every((property) =>
    allowedUpdates.includes(property)
  );
  if (!isMatch) return next(ApiError.badRequest('Invalid operation'));

  const { id } = req.params;
  const user = req.user;

  try {
    const column = await Column.findById(id);

    const dashboard = await Dashboard.findOne({
      users: user,
      columns: id,
    });
    if (!dashboard)
      return next(ApiError.badRequest('The dashboard does not exist'));

    updates.forEach((update) => (column[update] = req.body[update]));

    await column.save();

    res.status(200).send(column);
  } catch (error) {
    next(error);
  }
});

router.delete('/columns/:id', auth, async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const column = await Column.findById(id);

    const dashboard = await Dashboard.findOne({
      owner: user._id,
      columns: id,
    });
    if (!dashboard)
      return next(ApiError.badRequest('The dashboard does not exist'));

    await column.remove();

    res.status(200).send(column);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
