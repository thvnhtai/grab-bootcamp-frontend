import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import enUS from 'antd/es/locale/en_US';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { AuthProvider } from './AuthProvider';
import { ContextProvider } from './ContextProvider';
import { NotificationProvider } from './NotificationProvider';

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ContextProvider>
      <ConfigProvider
        locale={enUS}
        theme={{
          token: {
            fontFamily: 'Poppins, sans-serif'
          }
        }}
      >
        <Provider store={store}>
          <NotificationProvider>
            <AuthProvider>{children}</AuthProvider>
          </NotificationProvider>
        </Provider>
      </ConfigProvider>
    </ContextProvider>
  );
}
