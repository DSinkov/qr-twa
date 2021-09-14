import React from 'react';
import styles from './ParsedContent.module.scss';
import { EMAIL_REGEX, URL_REGEX } from '../../../constants/regex';
import LinkPreview from '../LinkPreview/LinkPreview';
import { Preview } from '../../../constants/models';
import { ENDPOINTS } from '../../../constants/endpoints';

interface Props {
  rawValue: string;
}

const ParsedContent: React.FC<Props> = ({ rawValue }) => {
  const [linkPreview, setLinkPreview] = React.useState<Preview | null>(null);
  const isLink = !!rawValue.match(URL_REGEX);

  React.useEffect(() => {
    if (!isLink) return;
    const getPreview = async () => {
      let preview = null;
      try {
        preview = await fetch(getPreviewEndpoint(rawValue)).then((res) => res.json());
      } catch (e) {}
      setLinkPreview(preview);
    };
    getPreview();
  }, [rawValue, isLink]);

  switch (true) {
    case isLink: {
      return (
        <div className={styles.text_container}>
          <a target={'_blank'} rel={'noreferrer noopener'} href={rawValue}>
            {rawValue}
          </a>
          <LinkPreview data={linkPreview} />
        </div>
      );
    }
    case !!rawValue.match(EMAIL_REGEX): {
      return (
        <div className={styles.text_container}>
          <a href={`mailto:${rawValue}`}>{rawValue}</a>
        </div>
      );
    }
    default: {
      return <>{rawValue}</>;
    }
  }
};

export default ParsedContent;

const getPreviewEndpoint = (url: string): string => `${ENDPOINTS.getLinkPreview}?${new URLSearchParams({ url })}`;
