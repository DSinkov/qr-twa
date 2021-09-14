import React from 'react';
import styles from './TorchToggle.module.scss';
import { ReactComponent as OnIcon } from '../../assets/icons/flash_on.svg';
import { ReactComponent as OffIcon } from '../../assets/icons/flash_off.svg';

interface Props {
  track?: MediaStreamTrack;
}

/**
 * ImageCapture Api has lack of support. And has bugs in implementations. In some browsers `track.getSettings()`
 * always returns `torch:false` whether it ON or OFF. So we have to save it's value in the state. Doing that we make
 * an assumption that nobody except our code can toggle torch and that by default torch is off. Which might be not true
 * in some environment. The only negative effect from this is the possibility of showing wrong icon for user.
 */
const TorchToggle: React.FC<Props> = ({ track }) => {
  const [isTorchAvailable, setIsTorchAvailable] = React.useState<boolean>(false);
  const [isTorchOn, setIsTorchOn] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!track) return;
    setIsTorchAvailable(false);
    const imageCapture = new ImageCapture(track);
    imageCapture.getPhotoCapabilities().then(() => {
      setIsTorchAvailable(track.getSettings().hasOwnProperty('torch'));
    });
  }, [track]);

  if (!isTorchAvailable) return null;

  const handleToggleTorch = async () => {
    if (!track || !isTorchAvailable) return;
    try {
      await track.applyConstraints({ advanced: [{ torch: !isTorchOn }] });
      setIsTorchOn(!isTorchOn);
    } catch (e) {}
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={handleToggleTorch}>
        {isTorchOn ? <OffIcon /> : <OnIcon />}
      </button>
    </div>
  );
};

export default TorchToggle;
