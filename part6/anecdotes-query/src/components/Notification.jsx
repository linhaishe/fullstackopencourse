import { useNotification } from '../NotificationContext';

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
      {notification}
    </div>
  );
};

export default Notification;
