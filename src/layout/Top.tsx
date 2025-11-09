import { Layout } from 'antd';
import logo from '@/assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import styles from './Top.module.css';

const { Header } = Layout;

export default function Top() {
  const navigate = useNavigate()

  const handleClickLogo = () => {
    navigate('/')
  }
  
  return <Header className={styles.headerStyle}>
    <div className={styles.topLeftStyle} onClick={handleClickLogo}>
      <img src={logo} alt="PersonTree Logo" />
      PersonTree
    </div>
    <div className={styles.buttonBox}>
      <Button type="text">About</Button>
      <Button type="text">FAQ</Button>
      <Button type="text">Contact</Button>
      <Button type="primary">Connect Wallet</Button>
    </div>
  </Header>
}