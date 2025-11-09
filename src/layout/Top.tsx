import { Layout } from 'antd';
import logo from '@/assets/logo.svg';
const { Header } = Layout;
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd';
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#000',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#fff',
  borderBottom: '1px solid #e8e8e8',
  display: 'flex',
  justifyContent: 'space-between'
};

const TopLeftStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer'
}
export default function Top() {

  const navigate = useNavigate()

  const handleClickLogo = () => {
    navigate('/')
  }
  return <Header style={headerStyle}>
    <div style={TopLeftStyle} onClick={handleClickLogo}>
      <img src={logo} alt="PersonTree Logo" />
      PersonTree</div>
    <div className="button-box">
      <Button  type="text">About</Button>
      <Button  type="text">FAQ</Button>
      <Button  type="text">Contact</Button>
      <Button  type="primary">Connect Wallet</Button>

    </div>
  </Header>
}