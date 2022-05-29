import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Prediction, PredictionType } from '../components/Prediction';
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
export const Recognizer: React.FC = () => {
  const [displayedTab, setDisplayedTab] = useState(0);
  return (
    <Box>
      <Typography variant="h4" padding={4}>
        Sign Language Recognizer
      </Typography>
      <Box padding={5} display="flex" justifyContent="center">
        <Tabs value={displayedTab} onChange={(_, value) => setDisplayedTab(value)}>
          <Tab label="Upload" {...a11yProps(0)} />
          <Tab label="Live" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box>
        {displayedTab === 0 && <Prediction predictionType={PredictionType.Upload} />}
        {displayedTab === 1 && <Prediction predictionType={PredictionType.Live} />}
      </Box>
    </Box>
  );
};
