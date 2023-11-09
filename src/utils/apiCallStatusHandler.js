import { toast } from 'react-toastify';

const successNotification = () => {
  toast.success('Success!', {
    toastId: 'success-notification',
  });
};
const errorNotification = () => {
  toast.error('Failure !', { toastId: 'error-notification' });
};

const warnNotification = () => {
  toast.warn('Please provide all notification handling values', {
    toastId: 'warning-notification',
  });
};

const useApiCallStatusNotificationHandler = ({
  isSuccess,
  isError,
  isLoading,
  successCallBack,
  errorCallBack,
  loadingCallBack,
}) => {
  let showSpinner = false;
  if (
    isSuccess === undefined ||
    isError === undefined ||
    isLoading === undefined ||
    isSuccess === null ||
    isError === null ||
    isLoading === null
  ) {
    warnNotification();
  }
  if (isSuccess) {
    successNotification();
    if (successCallBack) successCallBack();
  }
  if (isError) {
    errorNotification();
    if (errorCallBack) errorCallBack();
  }
  if (isLoading) {
    showSpinner = true;
    if (loadingCallBack) loadingCallBack();
  }

  return {
    showSpinner,
  };
};

export default useApiCallStatusNotificationHandler;
