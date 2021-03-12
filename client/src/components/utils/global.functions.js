import { store } from 'react-notifications-component';

export const handleNotification = (title, message, type) => {
  store.addNotification({
    title: `${title}`,
    message: `${message}`,
    type: `${type}`,
    container: 'bottom-right',
    insert: 'top',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 2500,
      onScreen: true,
    },
  });
};
