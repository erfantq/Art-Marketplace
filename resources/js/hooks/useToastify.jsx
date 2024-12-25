import { toast } from 'react-toastify';

const useToastify = () => {
  const showToast = (type, message) => {
    if (type === 'error') {
      toast.error(message, {
        position: 'bottom-right',
        autoClose: 5000,
        theme: 'dark',
      });
    } else if (type === 'success') {
      toast.success(message, {
        position: 'bottom-right',
        autoClose: 5000,
        theme: 'dark',
      });
    }
    else if (type === 'info') {
      toast.info(message, {
        position: 'bottom-right',
        autoClose: 5000,
        theme: 'dark',
      });
    }
    else if (type === 'warning') {
      toast.warn(message, {
        position: 'bottom-right',
        autoClose: 5000,
        theme: 'dark',
      });
    }
  };

  return showToast; // Return the callable function
};

export default useToastify;
