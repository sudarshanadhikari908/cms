import { toast } from 'react-toastify';

class SessionToastMessage {
  static showSessionMessage = () => {
    const sessionMessage = window.localStorage.getItem('sessionmessage');
    if (sessionMessage) {
      const sessionMessageObject = JSON.parse(sessionMessage);
      if (sessionMessageObject && sessionMessageObject.type && sessionMessageObject.message) {
        window.localStorage.removeItem('sessionmessage');
        if (sessionMessageObject.type === 'success') {
          toast.success(sessionMessageObject.message);
        } else {
          toast.error(sessionMessageObject.message);
        }
      }
    }
  };
}

export default SessionToastMessage;
