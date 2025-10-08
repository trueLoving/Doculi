import React from 'react';
import { Box, CircularProgress, Typography, LinearProgress } from '@mui/material';

interface ProgressBarProps {
  progress: number;
  message?: string;
  variant?: 'circular' | 'linear';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  message = '处理中...', 
  variant = 'circular' 
}) => {
  if (variant === 'linear') {
    return (
      <Box sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2" sx={{ flexGrow: 1 }}>
            {message}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round(progress)}%
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ height: 8, borderRadius: 4 }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={80}
          thickness={4}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};
