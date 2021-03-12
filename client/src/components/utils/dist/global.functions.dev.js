"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNotification = void 0;

var _reactNotificationsComponent = require("react-notifications-component");

var handleNotification = function handleNotification(title, message, type) {
  _reactNotificationsComponent.store.addNotification({
    title: "".concat(title),
    message: "".concat(message),
    type: "".concat(type),
    container: 'bottom-right',
    insert: 'top',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 2500,
      onScreen: true
    }
  });
};

exports.handleNotification = handleNotification;