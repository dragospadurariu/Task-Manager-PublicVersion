"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchLogout = exports.fetchLogin = exports.fetchRegister = exports.loadUser = exports.userIsLoading = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _authToken = require("../components/utils/authToken");

var _alert = require("./alert.action");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//User is loading
var userIsLoading = function userIsLoading(isLoaded) {
  return {
    type: _types.USER_IS_LOADING,
    payload: isLoaded
  };
}; //Load User


exports.userIsLoading = userIsLoading;

var loadUser = function loadUser(token) {
  return function _callee(dispatch) {
    var res, data;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get('/users/me'));

          case 3:
            res = _context.sent;
            data = {
              user: res.data,
              token: token
            };
            dispatch({
              type: _types.LOAD_USER,
              payload: data
            });
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            dispatch({
              type: _types.AUTH_ERROR
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
}; //Register User


exports.loadUser = loadUser;

var fetchRegister = function fetchRegister(formData) {
  return function _callee2(dispatch) {
    var name, email, password, config, body, errors;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            name = formData.name, email = formData.email, password = formData.password;
            config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            body = JSON.stringify({
              name: name,
              email: email,
              password: password
            });
            _context2.prev = 3;
            _context2.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].post('/users/signup', body, config));

          case 6:
            dispatch({
              type: _types.REGISTER_SUCCESS
            });
            dispatch((0, _alert.setAlert)('Register success. Please check your email to verify your account', 'success', 10000));
            _context2.next = 16;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](3);
            errors = _context2.t0.response.data.message;

            if (errors) {
              errors.forEach(function (error) {
                dispatch((0, _alert.setAlert)(error, 'danger'));
              });
            }

            dispatch({
              type: _types.REGISTER_FAIL
            });
            return _context2.abrupt("return");

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[3, 10]]);
  };
}; //Login User


exports.fetchRegister = fetchRegister;

var fetchLogin = function fetchLogin(formData) {
  return function _callee3(dispatch) {
    var email, password, config, body, res, errors;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            email = formData.email, password = formData.password;
            config = {
              headers: {
                'Content-Type': 'application/json'
              }
            };
            body = JSON.stringify({
              email: email,
              password: password
            });
            _context3.prev = 3;
            _context3.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].post('/users/login', body, config));

          case 6:
            res = _context3.sent;
            dispatch(userIsLoading(true));
            dispatch({
              type: _types.LOGIN_SUCCESS,
              payload: res.data
            });
            (0, _authToken.setAuthToken)(localStorage.token);
            _context3.next = 18;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](3);
            errors = _context3.t0.response.data.message;

            if (errors) {
              errors.forEach(function (error) {
                dispatch((0, _alert.setAlert)(error, 'danger'));
              });
            }

            dispatch({
              type: _types.LOGIN_FAIL
            });
            return _context3.abrupt("return");

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[3, 12]]);
  };
}; //Logout  / Clear profile


exports.fetchLogin = fetchLogin;

var fetchLogout = function fetchLogout() {
  return function _callee4(dispatch) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            dispatch({
              type: _types.LOG_OUT
            });
            _context4.prev = 1;
            _context4.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].post('/users/logout'));

          case 4:
            _context4.next = 8;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](1);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 6]]);
  };
};

exports.fetchLogout = fetchLogout;