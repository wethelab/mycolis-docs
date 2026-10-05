import React, {type ReactNode} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export interface ScreenshotProps {
  /** Site absolute path, for example /img/prise-en-main/connexion-colissimo-1.png */
  src: string;
  /** Sentence describing what the image shows. Required, never decorative. */
  alt: string;
  /** Optional line under the image, stating what the reader should notice. */
  caption?: string;
}

/**
 * Framed screenshot with an optional caption.
 *
 * Capture and naming rules live in CONTRIBUTING.md.
 */
export default function Screenshot({
  src,
  alt,
  caption,
}: ScreenshotProps): ReactNode {
  const url = useBaseUrl(src);

  return (
    <figure className={styles.figure}>
      <img className={styles.image} src={url} alt={alt} loading="lazy" />
      {caption ? (
        <figcaption className={styles.caption}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}
