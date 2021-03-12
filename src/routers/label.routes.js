const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth.middleware');
const Label = require('../models/label.model');
const ApiError = require('../error/ApiError');
const Dashboard = require('../models/dashboard.model');

//@route   Get /label
//@desc    Get all dashboards's labels
//@access  Private
router.get('/label/:dashboardId', auth, async (req, res, next) => {
  const { dashboardId } = req.params;
  try {
    const labels = await Label.find({ owner: dashboardId });
    res.status(200).send(labels);
  } catch (error) {
    next(error);
  }
});

//@route   Post /label
//@desc    Create a new label
//@access  Private
router.post('/label/:dashboardId', auth, async (req, res, next) => {
  const { dashboardId } = req.params;
  try {
    const label = new Label({
      ...req.body,
      owner: dashboardId,
    });
    await label.save();
    res.status(200).send(label);
  } catch (error) {
    next(error);
  }
});

//@route   patch /label:id
//@desc    Edit label
//@access  Private
router.patch('/label/:id', auth, async (req, res, next) => {
  const labelId = req.params.id;
  const user = req.user;

  const updates = Object.keys(req.body);
  const allowedUpdates = ['name'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return next(ApiError.badRequest('Invalid updates!'));
  }
  try {
    const label = await Label.findOne({ _id: labelId });
    if (!label) return next(ApiError.badRequest('The task does not exist'));

    const dashboardId = label.owner;
    const dashboard = await Dashboard.findOne({
      _id: dashboardId,
      users: user,
    });
    if (!dashboard)
      return next(ApiError.badRequest('The dashboard does not exist'));

    updates.forEach((update) => (label[update] = req.body[update]));
    await label.save();
    res.status(200).send(label);
  } catch (error) {
    next(error);
  }
});

//@route   Delete /label/:id
//@desc    Delete a label
//@access  Private
router.delete('/label/:id', auth, async (req, res, next) => {
  const labelId = req.params.id;
  const user = req.user;

  try {
    const label = await Label.findOne({ _id: labelId });
    if (!label) return next(ApiError.badRequest('The task does not exist'));

    const dashboardId = label.owner;
    const dashboard = await Dashboard.findOne({
      _id: dashboardId,
      users: user,
    });
    if (!dashboard)
      return next(ApiError.badRequest('The dashboard does not exist'));

    await label.delete();
    res.status(200).send(label);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
