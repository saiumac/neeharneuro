import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { styled, TextFieldProps } from '@mui/material';
import { CalendarIcon } from '../../icons/ButtonIcons';

const dateTimePickerStyles = {
  width: '100%',
};

const StyledDateTimePicker = styled(DateTimePicker)({
  '.MuiPickersDay-today': {
    color: '#f8bbd0',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#e91e63',
    border: '1px solid',
    backgroundColor: '#880e4f',
  }
});

interface CustomDateTimePickerProps {
  value: Dayjs | null;
  label?: string;
  placeholder?: string;
  onChange: (newValue: Dayjs | null) => void;
  error?: boolean;
  helperText?: string;
  width?: string;
  disabled?: boolean;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({
  value,
  placeholder = 'Select Date and Time',
  label,
  onChange,
  error,
  helperText,
  width,
  disabled
}) => {
  const [open, setOpen] = useState(false);

  const handleChange = (value: unknown) => {
    const newValue = value as Dayjs | null;
    onChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDateTimePicker
        sx={{
          width: width,
          '& .MuiInputAdornment-root': {
            zIndex: '1',
            '& .MuiIconButton-root': {
              background: '#ffffff',
            },
          }
        }}
        format="DD-MM-YYYY HH:mm"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        label={label}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        slots={{ openPickerIcon: CalendarIcon }}
        slotProps={{
          popper: { sx: { zIndex: '9999999999999999' } },
          openPickerButton: {disabled:disabled},
          textField: {
            sx: dateTimePickerStyles,
            onClick: () => setOpen(true),
            placeholder: placeholder,
            error,
            helperText,
            disabled:disabled
          } as TextFieldProps,
        }}
      />
    </LocalizationProvider>
  );
};

export default CustomDateTimePicker;
