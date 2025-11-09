import { Outlet } from 'react-router-dom';
import Top from './Top';
import { Layout } from 'antd';
import styles from './index.module.css';

const { Content } = Layout

export default () => {
    return <>
        <Layout>
            <Top />
        </Layout>
        <Content className={styles.contentBox}>
            <Outlet />
        </Content>
    </>
}