import { Outlet } from 'react-router-dom';
import Top from './Top';
import { Layout } from 'antd';
const { Content } = Layout
const contentBox:React.CSSProperties = {
    padding: '0 150px'
}
export default () => {
    return <>
        <Layout>
            <Top />
        </Layout>
        <Content style={contentBox}>
            <Outlet />
        </Content>
    </>
}