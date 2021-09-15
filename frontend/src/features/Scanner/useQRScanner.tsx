import React, { MutableRefObject } from 'react';
import jsQR from 'jsqr';
import { useAppDispatch } from '../../appState/AppContext';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

type UseQRScanner = () => {
  canvasElRef: MutableRefObject<HTMLCanvasElement | null>;
  error: string;
  track?: MediaStreamTrack;
};

export const useQRScanner: UseQRScanner = () => {
  const appDispatch = useAppDispatch();
  const history = useHistory();
  const videoElRef = React.useRef<HTMLVideoElement>(document.createElement('video'));
  const canvasElRef = React.useRef<HTMLCanvasElement>(null);
  const shouldStopScanningRef = React.useRef<boolean>(false);
  const [track, setTrack] = React.useState<MediaStreamTrack>();
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    let videoStream: MediaStream;
    const videoEl = videoElRef.current;
    const canvasEl = canvasElRef.current;
    const canvas = canvasEl?.getContext('2d');

    if (!videoEl || !canvasEl || !canvas) return;

    videoEl.setAttribute('playsinline', 'true');

    const tick = () => {
      if (videoEl.readyState !== videoEl.HAVE_ENOUGH_DATA) return;

      updateCanvasSize(canvasEl, videoEl);

      canvas.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
      const imageData = canvas.getImageData(0, 0, canvasEl.width, canvasEl.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });

      if (!code?.data) return;

      shouldStopScanningRef.current = true; // immediate stop scanning
      videoEl.pause();
      videoStream.getTracks().forEach((track) => track.stop()); // stop camera stream (device camera indicator should be turned off after this)
      appDispatch({
        type: 'SET_LAST_SCAN_RESULT',
        payload: {
          date: Date.now(),
          value: code.data,
        },
      });
      history.push(ROUTES.lastScanResult);
    };

    const startScanning = () => {
      tick();
      if (shouldStopScanningRef.current) return;
      requestAnimationFrame(startScanning);
    };

    const getTrack = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        videoEl.srcObject = videoStream = stream;
        videoEl.play();
        requestAnimationFrame(startScanning);
        setTrack(stream.getVideoTracks()[0]);
      } catch (e) {
        setError('errors.permissionDenied');
      }
    };

    getTrack();

    return () => {
      shouldStopScanningRef.current = true;
    };
  }, [appDispatch, history]);

  return { canvasElRef, track, error };
};

const updateCanvasSize = (canvasEl: HTMLCanvasElement, videoEl: HTMLVideoElement) => {
  const width = Math.min(window.visualViewport.width, videoEl.videoWidth);
  const height = Math.round((videoEl.videoHeight / videoEl.videoWidth) * canvasEl.width);
  canvasEl.width !== width && (canvasEl.width = width);
  canvasEl.height !== height && (canvasEl.height = height);
};
