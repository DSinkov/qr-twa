import React from 'react';
import styles from './LinkPreview.module.scss';
import { Preview } from '../../../constants/models';

interface Props {
  data: Preview | null;
}

const LinkPreview: React.FC<Props> = ({ data }) => {
  if (!data) return null;

  switch (data.mediaType) {
    case 'image': {
      return (
        <a href={data.url} target={'_blank'} rel={'noreferrer noopener'} className={styles.image_container}>
          <img src={data.url} alt={data.url} data-testid={'image-preview'} />
        </a>
      );
    }
    case 'audio': {
      return (
        <audio controls data-testid={'audio player'}>
          <source src={data.url} type={data.contentType} />
        </audio>
      );
    }
    case 'video': {
      return (
        <video controls data-testid={'video player'}>
          <source src={data.url} type={data.contentType} />
        </video>
      );
    }
    default: {
      return (
        <a href={data.url} target={'_blank'} rel={'noreferrer noopener'} className={styles.container}>
          <div className={styles.title}>
            {data.favicons.length ? <img className={styles.favicon} src={data.favicons[0]} alt='link favicon' /> : null}
            <span>{data.title}</span>
          </div>
          <div className={styles.description}>
            {data.images?.length ? (
              <img className={styles.site_img} src={data.images[0]} alt='site description' />
            ) : null}
            <span>{data.description}</span>
          </div>
        </a>
      );
    }
  }
};

export default LinkPreview;
