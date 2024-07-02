import React, { useState } from 'react';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextFieldProps } from '@mui/material';
import { Dayjs } from 'dayjs';
import { ClockIcon } from '../../icons/ButtonIcons';

interface CustomTimePickerProps {
  label?: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({
  label,
  value,
  placeholder = 'Select Time',
  onChange,
  error,
  helperText,
}) => {
  const [open, setOpen] = useState(false);

  const handleChange = (value: unknown) => {
    const newValue = value as Dayjs | null;
    onChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        label={label}
        value={value}
        onChange={handleChange}
        slots={{ openPickerIcon: ClockIcon }}
        slotProps={{
          textField: {
            onClick: () => setOpen(true),
            error: error,
            helperText: helperText,
            placeholder: placeholder,
            fullWidth: true,
          } as TextFieldProps,
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomTimePicker;
