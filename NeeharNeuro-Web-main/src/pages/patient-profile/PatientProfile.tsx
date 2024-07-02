import React from "react";
import Layout from "../../layout/Layout";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  styled,
} from "@mui/material";
import theme from "../../Theme";

import profileIcon from "../../assets/profile.svg";
import { EditIcon } from "../../icons/ButtonIcons";
import AppointmentHistory from "./AppointmentHistory";
import TreatmentHistory from "./TreatmentHistory";

const DetailsStack = styled(Stack)({});
const DetailLabel = styled(Typography)({
  ...theme.typography.sb14,
  color: theme.palette.grey[500],
  lineHeight: "20px",
});
const DetailValue = styled(Typography)({
  ...theme.typography.sb16,
  color: theme.palette.grey[900],
  lineHeight: "20px",
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 4 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PatientProfile: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Layout title="Patient Profile">
      <Paper
        sx={{
          width: "100%",
          border: "1px solid #F4F6FC",
          boxShadow: "0px 10px 15px 0px #F7F8FC",
          backgroundColor: theme.palette.common.white,
          borderRadius: "8px",
          p: 4,
        }}
      >
        <Grid spacing={4} container>
          <Grid item xs={12} md={3} lg={2.5}>
            <Box
              sx={{
                backgroundColor: "#F7F8FC",
                borderRadius: "10px",
                py: 4,
                px: 3,
              }}
            >
              <Stack spacing={1}>
                <Stack spacing={1} alignItems={"center"}>
                  <img
                    style={{ width: "80px", height: "80px" }}
                    src={profileIcon}
                  />
                  <Typography sx={{ ...theme.typography.sb16 }}>
                    Jacob Jones
                  </Typography>
                  <Button startIcon={<EditIcon />} variant="text">
                    Edit
                  </Button>
                </Stack>
                <Stack
                  sx={{
                    "& .MuiStack-root": {
                      py: 2,
                      "&:not(:last-child)": {
                        borderBottom: "1px solid rgba(65, 89, 233, 0.1)",
                      },
                    },
                  }}
                >
                  <DetailsStack spacing={1}>
                    <DetailLabel>Patient ID</DetailLabel>
                    <DetailValue>#NN09876</DetailValue>
                  </DetailsStack>
                  <DetailsStack spacing={1}>
                    <DetailLabel>Age</DetailLabel>
                    <DetailValue>25</DetailValue>
                  </DetailsStack>
                  <DetailsStack spacing={1}>
                    <DetailLabel>Mobile Number</DetailLabel>
                    <DetailValue>+91 9483747538</DetailValue>
                  </DetailsStack>
                  <DetailsStack spacing={1}>
                    <DetailLabel>Email ID</DetailLabel>
                    <DetailValue>debra.holt@example.com</DetailValue>
                  </DetailsStack>
                  <DetailsStack spacing={1}>
                    <DetailLabel>Blood Group</DetailLabel>
                    <DetailValue>O+</DetailValue>
                  </DetailsStack>
                  <DetailsStack spacing={1}>
                    <DetailLabel>Address</DetailLabel>
                    <DetailValue>
                      321 Central Street, Mexico City 01150, Mexico
                    </DetailValue>
                  </DetailsStack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={9} lg={9.5}>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Appointment History" {...a11yProps(0)} />
                  <Tab label="Treatment History" {...a11yProps(1)} />
                  <Tab label="Time Line" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <AppointmentHistory/>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <TreatmentHistory/>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Item Three
              </CustomTabPanel>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default PatientProfile;
