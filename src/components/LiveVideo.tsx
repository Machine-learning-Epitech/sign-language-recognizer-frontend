import { Box, Button, Card, CardActions, Stack, Switch, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user'
};

interface Props {
  onChangeImage: (file: File) => void;
}
export const LiveVideo: React.FC<Props> = ({ onChangeImage }) => {
  const dataURLtoFile = (dataurl: string, filename: string) => {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)?.[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };
  const [image, setImage] = useState<string>();
  const [file, setFile] = useState<File>();
  const [videoMode, setVideoMode] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const capture = React.useCallback(() => {
    if (webcamRef?.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setFile(dataURLtoFile(imageSrc, 'file'));
        onChangeImage(dataURLtoFile(imageSrc, 'file'));
      }
    }
  }, [webcamRef]);
  const handleRetake = () => {
    setImage(undefined);
  };
  useEffect(() => {
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  }, [file]);
  useEffect(() => {
    if (videoMode) {
      const interval = setInterval(() => {
        capture();
      }, 4000);

      return () => clearInterval(interval);
    } // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [videoMode]);
  return (
    <Card>
      {image && !videoMode ? (
        <Box
          component="img"
          sx={{
            width: '400px',
            height: '400px'
          }}
          src={image}
        />
      ) : (
        <Webcam
          audio={false}
          height={400}
          screenshotFormat="image/jpeg"
          ref={webcamRef}
          width={400}
          videoConstraints={videoConstraints}
        />
      )}
      <CardActions>
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
          {image ? (
            <Button onClick={handleRetake}>Retake</Button>
          ) : (
            <Button onClick={capture}>Screenshot</Button>
          )}
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
            <Typography fontSize="15px">VIDEO</Typography>
            <Switch value={videoMode} onChange={() => setVideoMode(!videoMode)} />
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
};
