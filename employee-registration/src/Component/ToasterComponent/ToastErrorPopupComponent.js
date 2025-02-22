import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastErrorPopup = ({ message }) => {
  const notify = () => {
    toast.error(message, {
      //position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // Auto close the notification after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Call notify function when the component mounts
  React.useEffect(() => {
    debugger;
    notify();
  }, []);

  return null; // The component doesn't render anything visible
};

export default ToastErrorPopup;
