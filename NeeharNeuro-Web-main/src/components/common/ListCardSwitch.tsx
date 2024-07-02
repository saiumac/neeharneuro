import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Box, styled } from '@mui/material';
import { ListCardIcon, ListTableIcon } from '../../icons/ButtonIcons';
import theme from '../../Theme';

interface ListCardSwitchProps {
  defaultView?: 'list' | 'card';
  onChange?: (view: 'list' | 'card') => void;
}
const StyledToggleButton = styled(ToggleButton) ({
  width: '28px',
  height: '28px',
  border:0,
  padding: "8px",
  '& > svg path':{
    fill: "#8699BD"
  },
  '&:hover':{
    backgroundColor: "transparent",
  },
  '&.Mui-selected':{
    borderRadius: '6px 6px 6px 6px',
    backgroundColor: "#ffffff",
    boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.08)",
    '&:hover':{
      backgroundColor: "#ffffff",
    },
    '& > svg path':{
    fill: theme.palette.primary.main,
  },
  }
});
const ListCardSwitch: React.FC<ListCardSwitchProps> = ({ defaultView = 'list', onChange }) => {
  const [view, setView] = useState<'list' | 'card'>(defaultView);

  const handleViewChange = (_event: React.MouseEvent<HTMLElement>, nextView: 'list' | 'card' | null) => {
    if (nextView !== null) {
      setView(nextView);
      if (onChange) {
        onChange(nextView);
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" my={2}>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleViewChange}
        aria-label="list or card view"
        sx={{
          background:"#F7F8FC",
          borderRadius: "8px",
          padding: "5px",
        }}
      >
        <StyledToggleButton disableRipple value="list" aria-label="list view">
          <ListTableIcon/>
        </StyledToggleButton>
        <StyledToggleButton disableRipple value="card" aria-label="card view">
          <ListCardIcon/>
        </StyledToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ListCardSwitch;
