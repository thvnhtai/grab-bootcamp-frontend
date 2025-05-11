import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

const { Content } = Layout;

export function MainLayout() {
  return (
    <Layout style={{ background: '#fff', height: '100%' }}>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
}
