import React, { useState } from 'react';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { styled } from '@mui/material';
import { CalendarIcon } from '../../icons/ButtonIcons';

const datePickerStyles = {
  width: '100%',
};

const StyledDatePicker = styled(DatePicker)({
  '.MuiPickersDay-today': {
    color: '#f8bbd0',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#e91e63',
    border: '1px solid',
    backgroundColor: '#880e4f',
  }
});

interface CustomDatePickerProps {
  value: Dayjs | null;
  label?: string;
  placeholder?: string;
  onChange: (newValue: Dayjs | null) => void;
  error?: boolean;
  helperText?: string;
  width?: string;
  minDate?: Dayjs | null;  // Add minDate prop
  required? :boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  required,
  placeholder = 'Select Date',
  label,
  onChange,
  error,
  helperText,
  width,
  minDate,
}) => {
  const [open, setOpen] = useState(false);

  const handleChange = (value: unknown) => {
    const newValue = value as Dayjs | null;
    onChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
        sx={{
          width: width,
          '& .MuiInputAdornment-root': {
            zIndex: '1',
            '& .MuiIconButton-root': {
              background: '#ffffff',
            },
          }
        }}
        format="DD-MM-YYYY"
        open={open}
        label={label}
        value={value}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        onChange={handleChange}
        minDate={minDate || undefined}  // Ensure minDate is either Dayjs or undefined
        slots={{ openPickerIcon: CalendarIcon }}
        slotProps={{
          popper: { sx: { zIndex: '9999999999999999' } },
          textField: { sx: datePickerStyles, onClick: () => setOpen(true), placeholder: placeholder, error, helperText, required }
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
