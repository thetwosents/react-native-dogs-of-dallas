import React, { useState, useEffect } from 'react';
import { Modal, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const GlobalNotification = () => {
  const [title, setTitle] = useState('');
  const [notification, setNotification] = useState('');
  const notificationsArray = useSelector(state => state.notifications.notifications);
const dispatch = useDispatch();

  // Monitor the notificationsArray for changes
  useEffect(() => {
    if (notificationsArray.length > 0) {
      setTitle(notificationsArray[0].title);
      setNotification(notificationsArray[0].message);
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', index: 0 });
        setNotification('');
      }, 3000);
    }
  }, [notificationsArray]);
  
  return (
      <Modal 
        visible={notification !== ''}
        animationType="slide"
        transparent={true}
      >
        
            <Text>{title}</Text>
            <Text>{notification}</Text>
          
      </Modal>
  );
}

export default GlobalNotification;