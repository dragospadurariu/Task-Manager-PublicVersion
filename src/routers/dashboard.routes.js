const express = require('express');
const router = new express.Router();
const Dashboard = require('../models/dashboard.model.js');
const auth = require('../middleware/auth.middleware');
const ApiError = require('../error/ApiError');
const User = require('../models/user.model.js');

router.get('/dashboards', auth, async (req, res, next) => {
  const match = {};

  try {
    const dashboards = await Dashboard.find({
      users: req.user,
    });
    // await req.user
    //   .populate({
    //     path: 'dashboard',
    //     match,
    //     options: {
    //       limit: parseInt(req.query.limit),
    //       skip: parseInt(req.query.skip),
    //       sort: {
    //         createdAt: 1,
    //       },
    //     },
    //   })
    //   .execPopulate();
    res.send(dashboards);
  } catch (error) {
    next(error);
  }
});

router.get('/dashboards/:id', auth, async (req, res, next) => {
  const { id } = req.params;

  try {
    const dashboard = await Dashboard.findOne({
      _id: id,
      owner: req.user._id,
    });
    dashboard
      ? res.send(dashboard)
      : next(ApiError.forbidden('Dashboard does not exist'));
  } catch (error) {
    next(error);
  }
});

router.post('/dashboards', auth, async (req, res, next) => {
  const { _id, name, email } = req.user;

  const dashboard = new Dashboard({
    ...req.body,
    owner: req.user._id,
    users: [{ _id, name, email }],
  });

  try {
    await dashboard.save();
    res.status(201).send(dashboard);
  } catch (error) {
    next(ApiError.internal('Something went wrong'));
  }
});

//@route   PATCH /dashboard/:id/user/:useremail
//@desc    Add participants to the dashboard
//@access  Private
router.patch(
  '/dashboards/:id/user/:useremail',
  auth,
  async (req, res, next) => {
    const { id, useremail } = req.params;

    try {
      const dashboard = await Dashboard.findOne({
        _id: id,
        owner: req.user._id,
      });

      const newUser = await User.findOne({ email: useremail });
      const { _id, name, email } = newUser;

      //Check if user already exists
      const userExists = await Dashboard.findOne({
        _id: id,
        owner: req.user._id,
        users: newUser,
      });

      if (userExists) {
        next(ApiError.badRequest('User already exists on this dashboard'));
      }

      if (!dashboard) {
        next(ApiError.forbidden('Y our are not the dashboard owner.'));
      }

      if (!newUser) {
        next(ApiError.forbidden('User does not exists'));
      }

      dashboard.users.push({ _id, name, email });

      await dashboard.save();

      res.send(dashboard);
    } catch (error) {
      console.log(error);
      next(ApiError.internal('Something went wrong'));
    }
  }
);

//@route   DELETE /dashboard/:id/user/:useremail
//@desc    Delete participant from the dashboard
//@access  Private
router.delete('/dashboards/:id/user/:userid', auth, async (req, res, next) => {
  const { id, userid } = req.params;
  console.log('LOL');

  try {
    //Check if dashboard exits
    const dashboard = await Dashboard.findOne({
      _id: id,
    });

    if (!dashboard) {
      next(ApiError.forbidden('Dashboard does not exist'));
    }

    //The request is the dashboard owner
    let deletingUser;
    if (String(dashboard.owner) === String(req.user._id)) {
      console.log('The dashbord owner is the requester');
      deletingUser = await User.findOne({ _id: userid });
      //If is not the user owner, can only delete himself
    } else {
      console.log('The dashbord owner is NOT the requester');

      deletingUser = await User.findOne({ _id: req.user._id });
    }

    const { _id, name, email } = deletingUser;

    //Check if user already exists
    if (!deletingUser) {
      next(ApiError.forbidden('User does not exists'));
    }

    if (String(dashboard.owner) === String(deletingUser._id)) {
      next(
        ApiError.forbidden('You can not leave the dashboard You must delete it')
      );
    }

    //Check if user exists in the dashboard
    const userExists = await Dashboard.findOne({
      _id: id,
      users: deletingUser,
    });

    if (!userExists) {
      next(ApiError.badRequest('User does not exist on this dashboard'));
    }

    dashboard.users.pull({ _id, name, email });

    await dashboard.save();

    res.send(dashboard);
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
