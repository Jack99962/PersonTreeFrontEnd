import { Layout } from 'antd';
import logo from '@/assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { GlobalOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import styles from './Top.module.css';

const { Header } = Layout;

export default function Top() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const handleClickLogo = () => {
    navigate('/')
  }

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  const languageItems: MenuProps['items'] = [
    {
      key: 'en',
      label: t('language.english'),
      onClick: () => handleLanguageChange('en'),
    },
    {
      key: 'zh',
      label: t('language.chinese'),
      onClick: () => handleLanguageChange('zh'),
    },
  ]
  
  return <Header className={styles.headerStyle}>
    <div className={styles.topLeftStyle} onClick={handleClickLogo}>
      <img src={logo} alt="PersonTree Logo" />
      PersonTree
    </div>
    <div className={styles.buttonBox}>
      <Button type="text">{t('common.about')}</Button>
      <Button type="text">{t('common.faq')}</Button>
      <Button type="text">{t('common.contact')}</Button>
      <Dropdown menu={{ items: languageItems }} placement="bottomRight">
        <Button type="text" icon={<GlobalOutlined />}>
          {i18n.language === 'en' ? t('language.english') : t('language.chinese')}
        </Button>
      </Dropdown>
      <Button type="primary">{t('common.connectWallet')}</Button>
    </div>
  </Header>
}