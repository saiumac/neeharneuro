import React, { useState, useEffect, useRef } from "react";
import {
  Button,
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
import { EditIcon } from "../icons/ButtonIcons";
import theme from "../Theme";
import MoreVerticalMenu from "../components/common/MoreVerticalMenu";
import Layout from "../layout/Layout";
import CustomTablePagination from "../components/table/CustomTablePagination";
import TableSkeletonLoader from "../components/table/TableSkeletonLoader";
import {
  FilterIconActive,
  FilterIconFilled,
  FilterIconOutlined,
} from "../icons/FilterIcons";
import TruncatedName from "../components/common/TruncatedName";
import { SearchIcon } from "../icons/CommonIcons";
import ListCardSwitch from "../components/common/ListCardSwitch";
import { useNavigate } from "react-router-dom";

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
    patientId: "#N09876",
    photo: "",
    patientName: "Jacob Jones",
    phone: "+91 9483747538",
    email: "debra.holt@example.com",
    gender: "Male",
    blood: "O+",
    noOfVisits: "8",
    address: "321 Central Street, Mexico City 01010, Mexico",
  },
  {
    id: "6",
    patientId: "#N09876",
    photo: "",
    patientName: "Albert Flores",
    phone: "+91 9483747538",
    email: "dolores.chambers@example.com",
    gender: "Male",
    blood: "O-",
    noOfVisits: "8",
    address: "123 Tenth Avenue, Manhattan, New York 10011, USA",
  },
  {
    id: "5",
    patientId: "#N09876",
    photo: "",
    patientName: "Floyd Miles",
    phone: "+91 9483747538",
    email: "debbie.baker@example.com",
    gender: "Male",
    blood: "AB+",
    noOfVisits: "8",
    address: "Ludgate Hill II, Greater London, London, EC4M 7DQ, UK",
  },
  {
    id: "4",
    patientId: "#N09876",
    photo: "",
    patientName: "Devon Lane",
    phone: "+91 9483747538",
    email: "curtis.weaver@example.com",
    gender: "Male",
    blood: "O+",
    noOfVisits: "8",
    address: "123 Gran Via, Barcelona 08003, Spain",
  },
  {
    id: "3",
    patientId: "#N09876",
    photo: "",
    patientName: "Kristin Watson",
    phone: "+91 9483747538",
    email: "tim.jennings@example.com",
    gender: "Male",
    blood: "B-",
    noOfVisits: "4",
    address: "98 Queen Street, Cardiff CF25 8UD, UK",
  },
  {
    id: "2",
    patientId: "#N09876",
    photo: "",
    patientName: "Cody Fisher",
    phone: "+91 9483747538",
    email: "deanna.curtis@example.com",
    gender: "Male",
    blood: "O+",
    noOfVisits: "8",
    address: "987 Gran Via, Madrid 28040, Spain",
  },
  {
    id: "8",
    patientId: "#N09876",
    photo: "",
    patientName: "Cody Fisher",
    phone: "+91 9483747538",
    email: "deanna.curtis@example.com",
    gender: "Male",
    blood: "O+",
    noOfVisits: "8",
    address: "987 Gran Via, Madrid 28040, Spain",
  },
  {
    id: "9",
    patientId: "#N09876",
    photo: "",
    patientName: "Cody Fisher",
    phone: "+91 9483747538",
    email: "deanna.curtis@example.com",
    gender: "Male",
    blood: "O+",
    noOfVisits: "8",
    address: "987 Gran Via, Madrid 28040, Spain",
  },
  {
    id: "10",
    patientId: "#N09876",
    photo: "",
    patientName: "Cody Fisher",
    phone: "+91 9483747538",
    email: "deanna.curtis@example.com",
    gender: "Male",
    blood: "O+",
    noOfVisits: "8",
    address: "987 Gran Via, Madrid 28040, Spain",
  },
  {
    id: "11",
    patientId: "#N09876",
    photo: "",
    patientName: "Cody Fisher",
    phone: "+91 9483747538",
    email: "deanna.curtis@example.com",
    gender: "Male",
    blood: "O+",
    noOfVisits: "8",
    address: "987 Gran Via, Madrid 28040, Spain",
  },
  {
    id: "12",
    patientId: "#N09876",
    photo: "",
    patientName: "Cody Fisher",
    phone: "+91 9483747538",
    email: "deanna.curtis@example.com",
    gender: "Male",
    blood: "O+",
    noOfVisits: "8",
    address: "987 Gran Via, Madrid 28040, Spain",
  },
];

const columns = [
  { id: "patientId", label: "Patient  ID", hasFilter: true },
  { id: "patientName", label: "Patient Name", hasFilter: true },
  { id: "phone", label: "Phone", hasFilter: false },
  { id: "email", label: "Email", hasFilter: false },
  { id: "gender", label: "Gender", hasFilter: true },
  { id: "blood", label: "Blood", hasFilter: false },
  { id: "noOfVisits", label: "No of Visits", hasFilter: false },
  { id: "address", label: "Address", hasFilter: false },
];

const PatientList: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'card'>('list');
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
      icon: <EditIcon />,
      text: "Edit",
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
  const handleViewChange = (newView: 'list' | 'card') => {
    setView(newView);
  };
  return (
    <Layout title="Patients">
      <Stack width="100%">
        <Paper
          sx={{
            width: "100%",
            border: "1px solid #F4F6FC",
            boxShadow: "0px 10px 15px 0px #F7F8FC",
            backgroundColor: theme.palette.common.white,
            borderRadius: "8px",
            p:4,
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
                placeholder="Search patient name or id..." 
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
             <ListCardSwitch defaultView={view} onChange={handleViewChange} />
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
                        <Button onClick={()=> navigate('/patient-profile')}>{patientData.patientId}</Button>
                      </TableCell>
                      <TableCell>
                        <Stack
                          spacing={2}
                          direction={"row"}
                          alignItems={"center"}
                        >
                          <Avatar
                            src={patientData.photo}
                            {...stringAvatar(patientData.patientName)}
                          />
                          <Box>{patientData.patientName}</Box>
                        </Stack>
                      </TableCell>
                      <TableCell>{patientData.phone}</TableCell>
                      <TableCell>{patientData.email}</TableCell>
                      <TableCell>{patientData.gender}</TableCell>
                      <TableCell>{patientData.blood}</TableCell>
                      <TableCell>
                        <Button
                          sx={{
                            backgroundColor: "#F0F7FE",
                            padding: "2px 7px 2px 7px",
                            borderRadius: "50%",
                          }}
                        >
                          {patientData.noOfVisits}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <TruncatedName
                          name={patientData.address}
                          characters={30}
                        />
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
    </Layout>
  );
};

export default PatientList;
