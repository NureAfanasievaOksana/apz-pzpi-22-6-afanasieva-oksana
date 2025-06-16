import { useState, useEffect } from 'react';
import api from '../services/api';
import NotificationTable from '../components/NotificationTable';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Notifications</h1>
      <NotificationTable notifications={notifications} />
    </div>
  );
};

export default NotificationsPage;