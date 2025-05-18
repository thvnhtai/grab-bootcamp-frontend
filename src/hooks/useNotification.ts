import { createContext, useContext } from 'react';
import { NotificationType } from '../types';

type NotificationContextType = {
  notify: (
    type: NotificationType,
    message: string,
    description?: string
  ) => void;
};

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};
