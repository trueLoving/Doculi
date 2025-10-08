import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Paper } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled = false }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    multiple: false,
    disabled
  });

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: 4,
        textAlign: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.300',
        backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: disabled ? 'grey.300' : 'primary.main',
          backgroundColor: disabled ? 'background.paper' : 'action.hover'
        }
      }}
    >
      <input {...getInputProps()} />
      <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        {isDragActive ? '释放文件到此处' : '拖拽文件到此处或点击选择'}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        支持 PDF、DOCX、JPG、PNG 格式
      </Typography>
    </Paper>
  );
};
