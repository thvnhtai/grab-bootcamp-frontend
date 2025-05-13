import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import ScrollToTopButton from '../components/utility/ScrollToTopButton';

const { Content } = Layout;

export function MainLayout() {
  return (
    <Layout style={{ background: '#fff', height: '100%' }}>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
      <ScrollToTopButton />
    </Layout>
  );
}
