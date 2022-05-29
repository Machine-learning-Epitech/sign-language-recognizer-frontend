import { useEffect, useState } from 'react';
import { useSignLanguageModel } from '../hooks/useSignLanguageModel';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { UploadPicture } from './UploadPicture';
import { LiveVideo } from './LiveVideo';

export enum PredictionType {
  Upload,
  Live
}

interface Props {
  predictionType: PredictionType;
}

export const Prediction: React.FC<Props> = ({ predictionType }) => {
  const [image, setImage] = useState<File>();
  const handleChange = (file: File) => {
    setImage(file);
  };
  const { predictSign, data, isLoading } = useSignLanguageModel();
  useEffect(() => {
    if (image) {
      predictSign(image);
    }
  }, [image]);
  return (
    <Box>
      <Stepper activeStep={image ? 1 : 0} sx={{ marginX: 25, marginY: 4 }}>
        <Step key={0}>
          <StepLabel>
            {predictionType === PredictionType.Upload ? 'Upload an image' : 'Record'}
          </StepLabel>
        </Step>
        <Step key={1}>
          <StepLabel>Prediction</StepLabel>
        </Step>
      </Stepper>
      <Stack justifyContent="space-around" flexDirection="row" width="100%">
        <Stack alignItems="center">
          {predictionType === PredictionType.Upload ? (
            <UploadPicture onChangeImage={handleChange} />
          ) : (
            <LiveVideo onChangeImage={handleChange} />
          )}
        </Stack>
        <Card sx={{ width: '400px' }}>
          <Typography>Result</Typography>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              justifyContent: 'center'
            }}>
            {data && data?.result && <Typography variant="h4">{data?.result}</Typography>}
            {isLoading && <CircularProgress />}
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};
