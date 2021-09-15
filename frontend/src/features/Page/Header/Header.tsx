import React from 'react';
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { useRouteMatch } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';

const titlesMap = {
  [ROUTES.scanner]: 'header.scannerPageTitle',
  [ROUTES.lastScanResult]: 'header.scanResultPageTitle',
  [ROUTES.history]: 'header.historyPageTitle',
};

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { path } = useRouteMatch();
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>{t(titlesMap[path])}</h1>
    </header>
  );
};

export default Header;
