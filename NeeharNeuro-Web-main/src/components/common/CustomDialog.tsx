import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { XcircleIcon } from '../../icons/ButtonIcons';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: theme.spacing(2),
    },
    zIndex: 14000000000, // Ensure you remove or adjust this if you use the zIndex prop from CustomizedDialogProps
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    margin: 0,
    padding: '20px 20px 15px 20px',
    ...theme.typography.b20,
    borderBottom: '1px solid #E7EBF9'
}));

interface CustomizedDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | false;
  zIndex?: number;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const CustomizedDialogs: React.FC<CustomizedDialogProps> = ({
  title,
  open,
  onClose,
  maxWidth,
  children,
  zIndex,
  actions
}) => {
  // Determine if maxWidth is a number and apply directly as a style if so
  const dialogStyle = typeof maxWidth === 'number' ? { maxWidth: `${maxWidth}px` } : {};

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth={true}
      sx={{
        zIndex: zIndex,
      }}
      maxWidth={typeof maxWidth === 'string' ? maxWidth : false}
      PaperProps={{ style: dialogStyle }} 
    >
      <StyledDialogTitle id="customized-dialog-title">
        {title}
      </StyledDialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 12,
          top: 12,
        }}
      >
        <XcircleIcon/>
      </IconButton>
      <DialogContent sx={{ p: 4 }}>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions sx={{ p: 3, borderTop: '1px solid #E7EBF9' }}>
          {actions}
        </DialogActions>
      )}
    </BootstrapDialog>
  );
};

export default CustomizedDialogs;