import styles from './sesstionOne.module.css'
import { useTranslation } from 'react-i18next'
import Tree from './tree'
export default () => {
    const { t } = useTranslation()
    
    return <div className={styles.contentBox}>
        <div className={styles.treeBox}>
            <Tree />
        </div>
        <div className={styles.textBox}>
            <div className={styles.topTitle}>{t('home.title')}</div>
            <div className={styles.subtitle}>{t('home.subtitle')}</div>
        </div>
    </div>
}