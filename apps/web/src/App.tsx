import { useState, useCallback } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { FileUpload } from './components/FileUpload';
import { ProgressBar } from './components/ProgressBar';
import { SecurityWarningDialog } from './components/SecurityWarningDialog';
import { conversionService, type ConversionOptions } from './services/conversionService';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<'pdf' | 'docx'>('pdf');
  const [watermarkText, setWatermarkText] = useState('Confidential');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showSecurityDialog, setShowSecurityDialog] = useState(false);
  const [pendingDownload, setPendingDownload] = useState<{data: Uint8Array, fileName: string} | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    setSelectedFile(file);
    setError(null);
    setSuccess(null);
    
    // 根据文件类型自动设置目标格式
    const extension = file.name.toLowerCase().split('.').pop();
    if (extension === 'pdf') {
      setTargetFormat('docx');
    } else if (extension === 'docx') {
      setTargetFormat('pdf');
    } else if (['jpg', 'jpeg', 'png'].includes(extension || '')) {
      setTargetFormat('pdf');
    }
  }, []);

  const simulateProgress = useCallback(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 200);
  }, []);

  const handleConvert = useCallback(async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setSuccess(null);
    
    // 开始进度模拟
    simulateProgress();
    setProgressMessage('正在处理文件...');

    try {
      const options: ConversionOptions = {
        targetFormat,
        watermarkText: targetFormat === 'pdf' ? watermarkText : undefined
      };

      const result = await conversionService.convertFile(selectedFile, options);

      if (result.success && result.data) {
        // 检查是否包含敏感信息
        const hasSensitiveContent = await conversionService.detectSensitiveContent(
          selectedFile.name + ' ' + watermarkText
        );

        if (hasSensitiveContent) {
          setPendingDownload({ data: result.data, fileName: result.fileName });
          setShowSecurityDialog(true);
        } else {
          conversionService.downloadFile(result.data, result.fileName);
          setSuccess(`文件转换成功！已下载 ${result.fileName}`);
        }
      } else {
        setError(result.error || '转换失败');
      }
    } catch (err) {
      setError(`转换过程中发生错误: ${err}`);
    } finally {
      setIsProcessing(false);
      setProgress(100);
      setProgressMessage('处理完成');
    }
  }, [selectedFile, targetFormat, watermarkText, simulateProgress]);

  const handleSecurityConfirm = useCallback(() => {
    if (pendingDownload) {
      conversionService.downloadFile(pendingDownload.data, pendingDownload.fileName);
      setSuccess(`文件转换成功！已下载 ${pendingDownload.fileName}`);
      setPendingDownload(null);
    }
    setShowSecurityDialog(false);
  }, [pendingDownload]);

  const handleSecurityCancel = useCallback(() => {
    setShowSecurityDialog(false);
    setPendingDownload(null);
    setError('下载已取消：检测到敏感信息');
  }, []);

  const getFileTypeDescription = () => {
    if (!selectedFile) return '';
    const extension = selectedFile.name.toLowerCase().split('.').pop();
    switch (extension) {
      case 'pdf':
        return 'PDF文档';
      case 'docx':
        return 'Word文档';
      case 'jpg':
      case 'jpeg':
        return 'JPEG图片';
      case 'png':
        return 'PNG图片';
      default:
        return '未知格式';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
            DocuSynapse
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            智能文档转换平台 - 支持PDF、DOCX、扫描件互转
          </Typography>

          <Box sx={{ mb: 4 }}>
            <FileUpload 
              onFileSelect={handleFileSelect} 
              disabled={isProcessing}
            />
          </Box>

          {selectedFile && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  文件信息
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  文件名: {selectedFile.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  文件类型: {getFileTypeDescription()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  文件大小: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
              </CardContent>
            </Card>
          )}

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>目标格式</InputLabel>
              <Select
                value={targetFormat}
                label="目标格式"
                onChange={(e) => setTargetFormat(e.target.value as 'pdf' | 'docx')}
                disabled={isProcessing}
              >
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="docx">DOCX</MenuItem>
              </Select>
            </FormControl>

            {targetFormat === 'pdf' && (
              <TextField
                label="水印文字"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                disabled={isProcessing}
                sx={{ flexGrow: 1 }}
              />
            )}
          </Box>

          {isProcessing && (
            <Box sx={{ mb: 3 }}>
              <ProgressBar 
                progress={progress} 
                message={progressMessage}
                variant="linear"
              />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleConvert}
              disabled={!selectedFile || isProcessing}
              sx={{ px: 4 }}
            >
              {isProcessing ? '转换中...' : '开始转换'}
            </Button>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              🔒 本地处理，数据不上传服务器 | 🚀 WASM技术，高性能转换 | 🛡️ 智能安全检测
            </Typography>
          </Box>
        </Paper>

        <SecurityWarningDialog
          open={showSecurityDialog}
          onClose={() => setShowSecurityDialog(false)}
          onConfirm={handleSecurityConfirm}
          onCancel={handleSecurityCancel}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
