import React from 'react';
import styles from './LastScanResult.module.scss';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../appState/AppContext';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import Page from '../Page/Page';
import { ReactComponent as Done } from '../../assets/icons/done.svg';
import ParsedContent from './ParsedContent/ParsedContent';

const LastScanResult: React.FC = () => {
  const { t } = useTranslation();
  const [{ lastScanResult }, appDispatch] = useApp();
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  if (!lastScanResult) {
    return <Redirect to={ROUTES.scanner} />;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(lastScanResult.value);
      setIsCopied(true);
    } catch (e) {}
  };

  return (
    <Page>
      <div className={styles.container}>
        <ParsedContent rawValue={lastScanResult.value} />
        <div className={styles.actions}>
          <button className={styles.action_btn} onClick={handleCopy}>
            {isCopied ? <Done /> : <span>{t('actions.copy')}</span>}
          </button>
          <button className={styles.action_btn} onClick={() => appDispatch({ type: 'RESET_SCAN_RESULT' })}>
            {t('actions.next')}
          </button>
        </div>
      </div>
    </Page>
  );
};

export default LastScanResult;
