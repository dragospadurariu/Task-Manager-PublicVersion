const express = require('express');
const router = new express.Router();
const Dashboard = require('../models/dashboard.model.js');
const auth = require('../middleware/auth.middleware');
const ApiError = require('../error/ApiError');

router.get('/dashboards', auth, async (req, res, next) => {
  const match = {};

  try {
    await req.user
      .populate({
        path: 'dashboard',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort: {
            createdAt: 1,
          },
        },
      })
      .execPopulate();
    res.send(req.user.dashboard);
  } catch (error) {
    next(error);
  }
});

router.get('/dashboards/:id', auth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const dashboard = await Dashboard.findOne({ _id: id, owner: req.user._id });
    dashboard
      ? res.send(dashboard)
      : next(ApiError.forbidden('Dashboard does not exist'));
  } catch (error) {
    next(error);
  }
});

router.post('/dashboards', auth, async (req, res, next) => {
  const dashboard = new Dashboard({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await dashboard.save();
    res.status(201).send(dashboard);
  } catch (error) {
    next(ApiError.internal('Something went wrong'));
  }
});

router.patch('/dashboards/:id', auth, async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) return next(ApiError.badRequest('Invalid updates!'));

  const { id } = req.params;

  try {
    const dashboard = await Dashboard.findOne({ _id: id, owner: req.user._id });

    if (!dashboard) {
      next(ApiError.forbidden('Dashboard does not exist'));
    }
    updates.forEach((update) => (dashboard[update] = req.body[update]));

    await dashboard.save();

    res.send(dashboard);
  } catch (error) {
    next(ApiError.internal('Something went wrong'));
  }
});

router.delete('/dashboards/:id', auth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const dashboard = await Dashboard.findOne({ _id: id, owner: req.user._id });
    if (!dashboard) {
      next(ApiError.forbidden('Dashboard does not exist'));
    }
    dashboard.remove();
    res.send(dashboard);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
