import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  Box
} from '@mui/material';
import { Warning } from '@mui/icons-material';

interface SecurityWarningDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export const SecurityWarningDialog: React.FC<SecurityWarningDialogProps> = ({
  open,
  onClose,
  onConfirm,
  onCancel
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Warning color="warning" />
          <Typography variant="h6">安全警告</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Alert severity="warning" sx={{ mb: 2 }}>
          检测到文档中包含身份证号码等敏感信息
        </Alert>
        <Typography variant="body1" paragraph>
          为了确保数据安全，系统已自动拦截此文档的下载操作。
        </Typography>
        <Typography variant="body2" color="text.secondary">
          请确认您有权限处理此类敏感文档，并确保遵守相关数据保护法规。
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          取消下载
        </Button>
        <Button onClick={onConfirm} color="warning" variant="contained">
          确认下载
        </Button>
      </DialogActions>
    </Dialog>
  );
};
