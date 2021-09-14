import React from 'react';
import styles from './LinkPreview.module.scss';
import { Preview } from '../../../constants/models';

interface Props {
  data: Preview | null;
}

const LinkPreview: React.FC<Props> = ({ data }) => {
  if (!data || data.url.slice(0, 8) !== 'https://') {
    return null;
  }

  return <div className={styles.container}>{JSON.stringify(data)}</div>;
};

export default LinkPreview;
