import React, { useState, useEffect, ReactNode, useRef } from "react";
import { useTheme, styled, Theme, CSSObject } from "@mui/material/styles";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Avatar,
  Button,
  useMediaQuery,
  Autocomplete,
  TextField,
  InputAdornment,
  ClickAwayListener,
  Badge,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import logoLg from "../assets/logo-lg.svg";
import profileIcon from "../assets/profile.svg";
import theme from "../Theme";
import { DownChevronIcon, SearchStrokedIcon } from "../icons/CommonIcons";
import {
  CalendarDefaultIcon,
  ConfigDefaultIcon,
  DashboardDefaultIcon,
  DoctorDefaultIcon,
  MenuToggleIcon,
  PatientDefaultIcon,
  ReportDefaultIcon,
  CalendarActiveIcon,
  ConfigActiveIcon,
  DashboardActiveIcon,
  DoctorActiveIcon,
  PatientActiveIcon,
  ReportActiveIcon,
} from "../icons/SidebarIcons";
import { CalendarWhiteIcon, NotificationIcon } from "../icons/ButtonIcons";

interface LayoutProps {
  children?: ReactNode;
  title: string;
}

const iconMapping: { [key: string]: JSX.Element } = {
  Dashboard: <DashboardDefaultIcon />,
  Appointments: <CalendarDefaultIcon />,
  Patients: <PatientDefaultIcon />,
  Doctors: <DoctorDefaultIcon />,
  Reports: <ReportDefaultIcon />,
  Config: <ConfigDefaultIcon />,
};

const activeIconMapping: { [key: string]: JSX.Element } = {
  Dashboard: <DashboardActiveIcon />,
  Appointments: <CalendarActiveIcon />,
  Patients: <PatientActiveIcon />,
  Doctors: <DoctorActiveIcon />,
  Reports: <ReportActiveIcon />,
  Config: <ConfigActiveIcon />,
};

const MenuToggleButton = styled(IconButton)({
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  position: "absolute",
  zIndex: 99999999999,
  top: "20px",
  right: "-15px",
  background: "#ffffff",
  "&:hover": {
    background: "#ffffff",
  },
});

const UserBox = styled(Stack)({
  paddingRight: 0,
  position: "relative",
});

const UserName = styled(Typography)({
  ...theme.typography.b14,
  lineHeight: "14px",
  color: theme.palette.grey[900],
});

const UserTitle = styled(Typography)({
  ...theme.typography.r14,
  lineHeight: "14px",
  color: theme.palette.grey[500],
  marginTop: "4px",
});

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: 400,
  [theme.breakpoints.down('md')]: {
    position: 'absolute',
    top: '10px',
    left: 0,
    right: 0,
    margin: '0 auto',
    zIndex: 999,
  },
}));

const SearchInput = styled(TextField) ({
  width: '100%',
  
  borderRadius: '10px',
  '& .MuiOutlinedInput-notchedOutline':{
    borderRadius: '20px',
    borderColor:'#A4ADCE',
  },
  '& .MuiInputBase-input':{
    padding: "0 !important",
  },
  '& .MuiOutlinedInput-root':{
    background: '#F7F8FC',
    borderRadius: '20px',
    padding: '10px 12px !important'
  },
});

const MobileSearchWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '73px',
  left: 0,
  right: 0,
  background: theme.palette.background.default,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[5],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  zIndex: 1300,
  [theme.breakpoints.down('sm')]: {
    top: '66px',
  },
}));

const drawerWidth = 250;
const miniDrawerWidth = 80;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  borderRight: 0,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: miniDrawerWidth,
  borderRight: 0,
});

const AppBarShift = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: `${miniDrawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  cursor: "pointer",
  height: "73px",
  [theme.breakpoints.down("sm")]: {
    height: "66px",
  },
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: theme.zIndex.drawer - 1,
  transition: theme.transitions.create("opacity", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  opacity: 0,
  visibility: "hidden",
  pointerEvents: "none",
  "&.open": {
    opacity: 1,
    visibility: "visible",
    pointerEvents: "auto",
  },
}));

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [options, setOptions] = useState<string[]>([
    "Option 1",
    "Option 2",
    "Option 3",
  ]);
  const [inputValue, setInputValue] = useState('');

  const mobileSearchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [isMobile]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSearchChange = async (value: string) => {
    setInputValue(value);
    // Fetch search suggestions here
    // For now, we'll just filter the existing options
    const filteredOptions = options.filter(option => option.toLowerCase().includes(value.toLowerCase()));
    setOptions(filteredOptions);
  };

  const handleClickAway = () => {
    if (searchOpen) {
      setSearchOpen(false);
    }
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBarShift
        sx={{
          paddingLeft: isMobile ? "0" : `${miniDrawerWidth}px`,
          background: theme.palette.common.white,
          boxShadow: "none",
          borderBottom: 0,
        }}
        position="fixed"
        open={!isMobile && open}
      >
        <Toolbar
          sx={{
            px: 3,
            [theme.breakpoints.up("md")]: {
              px: 6,
            },
            height: "73px",
            [theme.breakpoints.down("sm")]: {
              height: "66px",
            },
          }}
        >
          <Stack
            sx={{ width: "100%" }}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Stack direction={"row"} alignItems={"center"}>
              {isMobile && (
                <IconButton
                  aria-label="open drawer"
                  edge="start"
                  onClick={open ? handleDrawerClose : handleDrawerOpen}
                  sx={{
                    marginLeft: "-6px",
                    marginRight: "3px",
                    transform: "rotate(180deg)",
                  }}
                >
                  <MenuToggleIcon />
                </IconButton>
              )}
              <Typography
                variant="h1"
                color={"text.primary"}
                noWrap
                component="div"
              >
                {title}
              </Typography>
            </Stack>
            {isMobile ? (
              <IconButton onClick={() => setSearchOpen(!searchOpen)}>
                <SearchStrokedIcon />
              </IconButton>
            ) : (
              <SearchBox>
                <Autocomplete
                  freeSolo
                  options={options}
                  inputValue={inputValue}
                  onInputChange={(_event, newInputValue) => handleSearchChange(newInputValue)}
                  renderInput={(params) => (
                    <SearchInput
                      {...params} 
                      placeholder="Search for anything here..." 
                      variant="outlined" 
                      size="small"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchStrokedIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </SearchBox>
            )}
            <Stack spacing={3} direction={'row'} alignItems={'center'}>
              {!isMobile && (
                  <Button  onClick={()=> navigate('/book-appointment')} startIcon={<CalendarWhiteIcon/>} variant="contained" color="primary">Book Appointment</Button>
              )}
              <IconButton>
                <Badge color="secondary">
                  <NotificationIcon />
                </Badge>
              </IconButton>
              <Button sx={{ textAlign: "left" }} variant="text">
                <UserBox
                  sx={{ width: isMobile ? "auto" : "auto" }}
                  direction="row"
                  spacing={2}
                  alignItems={{ xs: "center", md: "flex-start" }}
                >
                  <Avatar
                    sx={{ width: 30, height: 30 }}
                    alt="User"
                    src={profileIcon}
                  />
                  {!isMobile && (
                    <Stack>
                      <UserName>Neehar Pottluri</UserName>
                      <UserTitle>Doctor</UserTitle>
                    </Stack>
                  )}
                  <DownChevronIcon />
                </UserBox>
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBarShift>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          background: theme.palette.common.white,
          position: "fixed",
          zIndex: 9999999999,
          "& .MuiPaper-root": {
            background: theme.palette.common.white,
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: isMobile
              ? drawerWidth
              : open
              ? drawerWidth
              : miniDrawerWidth,
          },
          ...(!open && {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
          }),
          ...(open && {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(theme),
          }),
        }}
      >
        {!isMobile && (
          <Box
            position={"fixed"}
            width={open ? drawerWidth : miniDrawerWidth}
            sx={{
              transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }}
          >
            <MenuToggleButton
              aria-label="open drawer"
              edge="start"
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              sx={{
                transform: !open ? "rotate(180deg)" : "",
                border: `1px solid ${!open ? "#E4E9FF" : theme.palette.primary.main}`,
              }}
            >
              <MenuToggleIcon />
            </MenuToggleButton>
          </Box>
        )}
        <DrawerHeader onClick={() => navigate("/patient-list")}>
          <Stack
            width={"100%"}
            direction={"row"}
            alignItems={"center"}
            justifyContent={open ? 'flex-start' : 'center'}
            padding={5}
          >
            {open ? (
              <img alt="logo" src={logoLg} />
            ) : (
              <img
                style={{
                  objectFit: "contain",
                }}
                alt="logo"
                src={logo}
              />
            )}
          </Stack>
        </DrawerHeader>
        <List>
          {[
            { text: "Dashboard", path: " " },
            { text: "Appointments", path: " " },
            { text: "Patients", path: "/patient-list" },
            { text: "Doctors", path: " " },
            { text: "Reports", path: " " },
            { text: "Config", path: " " },
          ].map(({ text, path }, index) => (
            <ListItem
              key={text + index}
              disablePadding
              sx={{ px: 3, display: "block" }}
            >
              <ListItemButton
                selected={isActive(path)}
                onClick={() => {
                  isMobile
                    ? (handleDrawerClose(), navigate(path))
                    : navigate(path);
                }}
                sx={{
                  borderRadius: "5px",
                  color: theme.palette.text.primary,
                  width: "100%",
                  height: 40,
                  justifyContent: open ? "initial" : "center",
                  px: 3,
                  mb: 2,
                  transition: theme.transitions.create("justifyContent", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                  }),
                  "& .MuiListItemIcon-root": {
                    transition: theme.transitions.create("color",
                      {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                      }
                    ),
                  },
                  "&.Mui-selected": {
                    background: "#E8EFFB",
                    color: theme.palette.primary.main,
                    "&:hover": {
                      background: "#E8EFFB",
                      color: theme.palette.primary.main,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "0",
                    justifyContent: "center",
                  }}
                >
                  {isActive(path)
                    ? activeIconMapping[text]
                    : iconMapping[text] || <DashboardDefaultIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    whiteSpace: "nowrap",
                    display: open ? "block" : "none",
                    transition: theme.transitions.create("opacity", {
                      easing: theme.transitions.easing.sharp,
                      duration: open
                        ? theme.transitions.duration.enteringScreen
                        : theme.transitions.duration.leavingScreen,
                    }),
                    "& .MuiTypography-root": {
                      ...theme.typography.m14,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Overlay className={open ? "open" : ""} onClick={handleDrawerClose} />
      <Box
        component="main"
        sx={{
          marginLeft: isMobile
            ? "0"
            : open
            ? `${miniDrawerWidth}px`
            : `${miniDrawerWidth}px`,
          flexGrow: 1,
          p: { xs: 3, md: 6 },
          width: `100%`,
          mt: "73px",
          [theme.breakpoints.down("sm")]: {
            mt: "66px",
          },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {children}
      </Box>
      {isMobile && searchOpen && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <MobileSearchWrapper ref={mobileSearchRef}>
            <Autocomplete
              freeSolo
              options={options}
              inputValue={inputValue}
              onInputChange={(_event, newInputValue) => handleSearchChange(newInputValue)}
              renderInput={(params) => (
                <SearchInput 
                  {...params} 
                  placeholder="Search for anything here..." 
                  variant="outlined" 
                  size="small"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchStrokedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <IconButton onClick={() => setSearchOpen(false)}>
              <DownChevronIcon />
            </IconButton>
          </MobileSearchWrapper>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default Layout;
