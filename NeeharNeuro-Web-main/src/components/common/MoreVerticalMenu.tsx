import React, { useState, ReactNode } from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText, styled, IconButton } from '@mui/material';
import { MoreVerticalIcon } from '../../icons/ButtonIcons';
import theme from '../../Theme';

const StyledMenu = styled(Menu)({
    '& .MuiMenuItem-root':{
        '& .MuiListItemIcon-root':{
            width:'14px',
            height:'14px',
            minWidth: 'auto',
            marginRight: '10px',
        },
    }
});
interface menuItem {
  text: string;
  color?: string;
  icon?: ReactNode;
  action: () => void;
}
interface MoreVerticalMenuProps {
  items :menuItem[];
}

const MoreVerticalMenu: React.FC<MoreVerticalMenuProps> = ({ items }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        sx={{p:0}}
        color='secondary'
        onClick={handleClick}
      >
        <MoreVerticalIcon />
      </IconButton>
      <StyledMenu
        id="actions-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{zIndex:1500}}
      >
        {items.map((item, index) => (
          <MenuItem key={item.text+index} onClick={() => { item.action(); handleClose(); }}>
            {item.icon &&
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
            }
            <ListItemText 
              sx={{color:item.color == 'error' ? theme.palette.error.main : item.color == 'success' ? theme.palette.success.main : 'initial'}}
            >
            {item.text}
            </ListItemText>
          </MenuItem>
        ))}
      </StyledMenu>
    </>
  );
};

export default MoreVerticalMenu;
