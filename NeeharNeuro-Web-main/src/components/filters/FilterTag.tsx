import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import theme from '../../Theme';
import { XcircleIcon } from '../../icons/ButtonIcons';

interface FilterTagProps {
  label: string;
  filterType?: string;
  filterData: string;
}

const ChipBase = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginLeft: '10px',
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.grey[500]}`,
  background: theme.palette.common.white,
}));

const AltChip = styled(ChipBase)({
  background: '#f6f6f6',
  marginRight: '10px',
  position: 'relative',
  '&:after':{
    content: '""',
    width: '1px',
    height: '100%',
    backgroundColor: theme.palette.grey[100],
    position: 'absolute',
    top: 0,
    right: '-11px',
  }
});

const FilterLabel = styled(Typography)(({ theme }) => ({
  ...theme.typography.r12,
  color: theme.palette.grey[600],
  '& span': {
    color: theme.palette.grey[800],
  },
}));

const FilterDate = styled(Typography)(({ theme }) => ({
  ...theme.typography.b12,
  color: theme.palette.grey[800],
}));

const FilterTag: React.FC<FilterTagProps> = ({ label, filterType, filterData }) => {
  const TagComponent = filterType ? AltChip : ChipBase;

  return (
    <TagComponent>
      <Stack direction='row' alignItems='center'>
        <Box>
          <FilterLabel variant="body2">
            {filterType ? (
              <>
                {label}: <span dangerouslySetInnerHTML={{ __html: filterType }}></span>
              </>
            ) : (
              label
            )}
          </FilterLabel>
          <FilterDate variant="body1">{filterData}</FilterDate>
        </Box>
        <IconButton sx={{p:0, ml:2}}>
          <XcircleIcon />
        </IconButton>
      </Stack>
    </TagComponent>
  );
};

export default FilterTag;
