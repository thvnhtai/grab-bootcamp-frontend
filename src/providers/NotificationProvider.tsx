import { notification } from 'antd';
import { ReactNode, useCallback, useEffect } from 'react';
import { NotificationContext } from '../hooks/useNotification';
import { useAppSelector } from '../redux/hooks';
import { watchMessages } from '../redux/slices/appSlice';
import { NotificationType } from '../types/common';

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationProvider = ({
  children
}: NotificationProviderProps) => {
  const [api, contextHolder] = notification.useNotification();
  const messages = useAppSelector(watchMessages);

  const notify = useCallback(
    (type: NotificationType, message: string, description?: string) => {
      api[type]({
        message,
        description,
        duration: 5,
        placement: 'topRight'
      });
    },
    [api]
  );

  useEffect(() => {
    messages.forEach(({ type, message, description }) => {
      notify(type, message, description);
    });
  }, [notify, messages]);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
