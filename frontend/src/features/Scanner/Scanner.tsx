import React from 'react';
import styles from './Scanner.module.scss';
import { useTranslation } from 'react-i18next';
import { useQRScanner } from './useQRScanner';
import Page from '../Page/Page';
import TorchToggle from '../TorchToggle/TorchToggle';

const Scanner: React.FC = () => {
  const { t } = useTranslation();
  const { canvasElRef, track, error } = useQRScanner();

  return (
    <Page>
      {error ? <div className={styles.message}>{t(error)}</div> : null}
      {!track && !error ? <div className={styles.message}>{t('scanner.cameraRequest')}</div> : null}
      <div className={styles.canvas}>
        <canvas ref={canvasElRef} />
      </div>
      <TorchToggle track={track} />
    </Page>
  );
};

export default Scanner;
