import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import enUS from 'antd/es/locale/en_US';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { AuthProvider } from './AuthProvider';
import { ContextProvider } from './ContextProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5
    }
  }
});

const customTheme = {
  token: {
    colorPrimary: 'var(--primary-color)',
    colorLink: 'var(--primary-color)',
    colorText: 'var(--text-primary)',
    colorTextSecondary: 'var(--text-secondary-1)',
    colorTextPlaceholder: 'var(--text-placeholder)',
    colorTextDisabled: 'var(--text-disabled)',
    colorBgBase: 'var(--bg-primary)',
    colorBorder: 'var(--border-color)',
    colorBorderSecondary: 'var(--bg-secondary-1)',
    colorError: 'var(--color-error)',
    colorSuccess: 'var(--color-success)',
    colorWarning: 'var(--color-warning)',
    colorInfo: 'var(--color-info)'
  }
};

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider locale={enUS} theme={customTheme}>
          <Provider store={store}>
            <AuthProvider>{children}</AuthProvider>
          </Provider>
        </ConfigProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ContextProvider>
  );
}
