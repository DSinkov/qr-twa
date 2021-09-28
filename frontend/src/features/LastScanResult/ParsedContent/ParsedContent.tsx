import React from 'react';
import styles from './ParsedContent.module.scss';
import { EMAIL_REGEX, URL_REGEX } from '../../../constants/regex';
import LinkPreview from '../LinkPreview/LinkPreview';
import { Preview } from '../../../constants/models';
import { ENDPOINTS } from '../../../constants/endpoints';
import Spinner from '../../../utils/Spinner/Spinner';

interface Props {
  rawValue: string;
}

const ParsedContent: React.FC<Props> = ({ rawValue }) => {
  const [linkPreview, setLinkPreview] = React.useState<Preview | null>(null);
  const isLink = !!rawValue.match(URL_REGEX);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isLink) return;
    const getPreview = async () => {
      let preview = null;
      try {
        setIsLoading(true);
        preview = await fetch(getPreviewEndpoint(rawValue)).then((res) => res.json());
      } catch (e) {}
      setIsLoading(false);
      setLinkPreview(preview);
    };
    getPreview();
  }, [rawValue, isLink]);

  switch (true) {
    case isLink: {
      return (
        <div>
          <a target={'_blank'} rel={'noreferrer noopener'} href={rawValue}>
            {rawValue}
          </a>
          <LinkPreview data={linkPreview} />
          {isLoading && (
            <div className={styles.spinner} data-testid={'spinner'}>
              <Spinner />
            </div>
          )}
        </div>
      );
    }
    case !!rawValue.match(EMAIL_REGEX): {
      return (
        <div>
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
