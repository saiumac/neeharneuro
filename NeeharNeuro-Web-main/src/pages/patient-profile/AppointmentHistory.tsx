import React, { useState, useEffect, useRef } from "react";
import {
  IconButton,
  Paper,
  Popover,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Avatar,
  TextField,
  styled,
  InputAdornment,
} from "@mui/material";
import { DownloadIcon, PrintIcon, ShareIcon } from "../../icons/ButtonIcons";
import theme from "../../Theme";
import MoreVerticalMenu from "../../components/common/MoreVerticalMenu";
import CustomTablePagination from "../../components/table/CustomTablePagination";
import TableSkeletonLoader from "../../components/table/TableSkeletonLoader";
import {
  FilterIconActive,
  FilterIconFilled,
  FilterIconOutlined,
} from "../../icons/FilterIcons";
import { SearchIcon } from "../../icons/CommonIcons";

import photo from "../../assets/profile.svg";

const SearchInput = styled(TextField) ({
  width: '100%',
  maxWidth: '300px', 
  '& .MuiOutlinedInput-notchedOutline':{
    borderColor:'#A4ADCE',
  },
  '& .MuiInputBase-input':{
    padding: "0 !important",
  },
  '& .MuiOutlinedInput-root':{
    background: '#F7F8FC',
    padding: '10px 12px !important'
  },
});

const patientData = [
  {
    id: "1",
    date: "01/05/2024",
    timeSlot: "11:15 - 11:30 AM",
    appointmentType: "Follow Up",
    bookedBy: "Kristin Watson",
    doctor: "Neehar Pottluri",
    status: "Completed",
  },
  {
    id: "2",
    date: "01/05/2024",
    timeSlot: "11:15 - 11:30 AM",
    appointmentType: "Follow Up",
    bookedBy: "Kristin Watson",
    doctor: "Neehar Pottluri",
    status: "Cancelled",
  },
];

const columns = [
  { id: "date", label: "Date", hasFilter: true },
  { id: "timeSlot", label: "Time Slot", hasFilter: false },
  { id: "appointmentType", label: "Appointment Type", hasFilter: false },
  { id: "bookedBy", label: "Booked By", hasFilter: false },
  { id: "doctor", label: "Doctor", hasFilter: false },
  { id: "status", label: "Status", hasFilter: false },
];

const AppointmentHistory: React.FC = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterState, setFilterState] = useState<{
    [key: string]: {
      isPopoverOpen: boolean;
      isActive: boolean;
      filterAnchorEl: HTMLElement | null;
    };
  }>(
    columns.reduce((acc, column) => {
      acc[column.id] = {
        isPopoverOpen: false,
        isActive: false,
        filterAnchorEl: null,
      };
      return acc;
    }, {} as { [key: string]: { isPopoverOpen: boolean; isActive: boolean; filterAnchorEl: HTMLElement | null } })
  );

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const filterButtonRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleFilterIconClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setFilterState((prev) => {
      const isCurrentlyOpen = prev[id].isPopoverOpen;
      // setFilterAnchorEl(isCurrentlyOpen ? null : filterButtonRefs.current[id]);
      return {
        ...prev,
        [id]: {
          isPopoverOpen: !isCurrentlyOpen,
          isActive: prev[id].isActive,
          filterAnchorEl: isCurrentlyOpen ? null : event.currentTarget,
        },
      };
    });
  };

  const handleFilterClose = (id: string) => {
    setFilterState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isPopoverOpen: false,
      },
    }));
    setFilterAnchorEl(null);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const dataToShow = patientData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const tableActionItems = [
    {
      icon: <DownloadIcon />,
      text: "Download",
      action: () => {}, // Add your action here
    },
    {
        icon: <PrintIcon />,
        text: "Print",
        action: () => {}, // Add your action here
      },
      {
        icon: <ShareIcon />,
        text: "Share",
        action: () => {}, // Add your action here
      },
  ];
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        width: "24px",
        height: "24px",
        ...theme.typography.m12,
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  return (

      <Stack width="100%">
        <Paper
          sx={{
            width: "100%",
            boxShadow: "0",
          }}
        >
          <Stack
            justifyContent="flex-end"
            alignItems="center"
            direction="row"
            spacing={2}
            marginBottom={4}
          >
            <SearchInput
                placeholder="Search..." 
                variant="outlined" 
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
          </Stack>
          <TableContainer sx={{ maxHeight: "calc(100vh - 290px)" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell
                      sx={{ whiteSpace: "nowrap" }}
                      key={column.id}
                      ref={(ref) =>
                        (filterButtonRefs.current[column.id] =
                          ref as HTMLButtonElement)
                      }
                    >
                      <Stack direction={"row"} alignItems={'center'}>
                        {column.label}
                        {column.hasFilter && (
                          <>
                            <IconButton
                              sx={{
                                ml: 1,
                                padding: "0",
                              }}
                              size="small"
                              onClick={(event) =>
                                handleFilterIconClick(event, column.id)
                              }
                            >
                              {filterState[column.id].isPopoverOpen ? (
                                <FilterIconFilled />
                              ) : filterState[column.id].isActive ? (
                                <FilterIconActive />
                              ) : (
                                <FilterIconOutlined />
                              )}
                            </IconButton>
                            {filterState[column.id].isPopoverOpen && (
                              <Popover
                                open={filterState[column.id].isPopoverOpen}
                                anchorEl={filterAnchorEl}
                                onClose={() => handleFilterClose(column.id)}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: index === 0 ? 20 : 20,
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "left",
                                }}
                              >
                                {/* Add filter component here */}
                                <Box p={2}>No Filter</Box>
                              </Popover>
                            )}
                          </>
                        )}
                      </Stack>
                    </TableCell>
                  ))}
                  <TableCell width={50}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableSkeletonLoader
                    rowsPerPage={rowsPerPage}
                    columnCount={columns.length}
                    hasActions={true}
                  />
                ) : (
                  dataToShow.map((patientData) => (
                    <TableRow key={patientData.id}>
                      <TableCell>
                        {patientData.date}
                      </TableCell>
                     
                      <TableCell>{patientData.timeSlot}</TableCell>
                      <TableCell>{patientData.appointmentType}</TableCell>
                      <TableCell>{patientData.bookedBy}</TableCell>
                      <TableCell>
                        <Stack
                          spacing={2}
                          direction={"row"}
                          alignItems={"center"}
                        >
                          <Avatar
                            src={photo}
                            {...stringAvatar(patientData.doctor)}
                          />
                          <Box>{patientData.doctor}</Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Box
                            sx={{
                                color: patientData.status === 'Completed' ? theme.palette.success.main : theme.palette.error.main,
                                backgroundColor: patientData.status === 'Completed' ? theme.palette.success.light : theme.palette.error.light,
                                width: '93px',
                                height: '28px',
                                borderRadius: '5px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            >
                            {patientData.status}
                            </Box>
                      </TableCell>
                      <TableCell width={50} align="right">
                        <Box sx={{ mr: 4 }}>
                          <MoreVerticalMenu items={tableActionItems} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {patientData.length > 10 && (
            <CustomTablePagination
              count={patientData.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </Stack>
  );
};

export default AppointmentHistory;
