const express = require('express');
const router = new express.Router();
const User = require('../models/user.model');
const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const jwt = require('jsonwebtoken');
const sendEmail = require('../email/account');
const ApiError = require('../error/ApiError');

router.get('/users/me', auth, async (req, res) => {
  res.send({ user: req.user });
});

//Sign up without email verification
router.post('/users/signup', async (req, res, next) => {
  const { email } = req.body;
  const emailCount = await User.countDocuments({ email });
  if (emailCount) return next(ApiError.badRequest(['Email already exists'], 1));

  const user = new User(req.body);
  user.confirmed = true;

  try {
    await user.save();
    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    if (error.name === 'ValidationError') {
      let errors = [];

      Object.keys(error.errors).forEach((key) => {
        errors.push(error.errors[key].message);
      });

      return next(ApiError.badRequest(errors, 1));
    }
    next(error);
  }
});

// router.post('/users/signup', async (req, res, next) => {
//   const { email } = req.body;
//   const emailCount = await User.countDocuments({ email });
//   if (emailCount) return next(ApiError.badRequest(['Email already exists'], 1));

//   const user = new User(req.body);

//   try {
//     await user.save();
//     const token = await user.generateAuthToken();

//     sendEmail(token, (error, data) => {
//       if (error) return next(ApiError.internal('Unable to send email', 2));
//     });

//     res.status(201).send({ user, token });
//   } catch (error) {
//     if (error.name === 'ValidationError') {
//       let errors = [];

//       Object.keys(error.errors).forEach((key) => {
//         errors.push(error.errors[key].message);
//       });

//       return next(ApiError.badRequest(errors, 1));
//     }
//     next(error);
//   }
// });

// router.get('/users/signup/activate/:token', async (req, res, next) => {
//   try {
//     const token = req.params.token;
//     const { _id } = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findOne({ _id });
//     if (!user) {
//       return next('Something went wrong');
//     }

//     user.confirmed = true;
//     await user.save();
//     res.send({ user, token });
//   } catch (error) {
//     return next('Something went wrong');
//   }
// });

router.post('/users/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password, next);
    if (!user) return;

    if (user.confirmed === false) {
      return next(
        ApiError.forbidden(['You must activate your user before login in'], 1)
      );
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    next(error);
  }
});

router.post('/users/logout', auth, async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    //FIXME:
    await req.user.save();
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post('/users/logoutAll', auth, async (req, res, next) => {
  try {
    req.user.tokens = [];
    //FIXME:
    await req.user.save();
    res.send();
  } catch (error) {
    next(error);
  }
});

router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    req.user.avatar = req.file.buffer;
    //FIXME:
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    next(error);
  }
);

router.delete('/users/me/avatar', auth, async (req, res) => {
  req.user.avatar = undefined;
  //FIXME:
  await req.user.save();
  res.send();
});

router.get('/users/:id/avatar', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      return next(ApiError.forbidden('Invalid User'));
    }

    res.set('Content-Type', 'image/jpg');
    res.send(user.avatar);
  } catch (error) {
    next(error);
  }
});

router.patch('/users/me', auth, async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return next(ApiError.badRequest('Invalid updates!'));
  }

  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    //FIXME:
    await user.save();
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
