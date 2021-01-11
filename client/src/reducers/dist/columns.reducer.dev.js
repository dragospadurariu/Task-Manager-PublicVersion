"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _types = require("../actions/types");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  columns: []
};

var columns = function columns() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      payload = action.payload;

  switch (type) {
    case _types.GET_COLUMNS_BY_DASHBOARD:
      {
        return _objectSpread({}, state, {
          columns: payload
        });
      }

    case _types.CLEAR_ALL_COLUMNS:
      {
        return _objectSpread({}, state, {
          columns: []
        });
      }

    case _types.ADD_NEW_COLUMN:
      {
        return _objectSpread({}, state, {
          columns: [].concat(_toConsumableArray(state.columns), [payload])
        });
      }

    case _types.UPDATE_COLUMN:
      {
        return _objectSpread({}, state, {
          columns: state.columns.map(function (column) {
            return column._id === payload._id ? _objectSpread({}, column, {
              name: payload.name
            }) : column;
          })
        });
      }

    case _types.DELETE_COLUMN:
      {
        return _objectSpread({}, state, {
          columns: state.columns.filter(function (column) {
            return column._id !== payload._id;
          })
        });
      }

    default:
      {
        return _objectSpread({}, state);
      }
  }
};

var _default = columns;
exports["default"] = _default;