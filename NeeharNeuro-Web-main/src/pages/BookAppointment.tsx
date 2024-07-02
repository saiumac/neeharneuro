import React from "react";
import Layout from "../layout/Layout";
import theme from "../Theme";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  InputAdornment,
  styled,
} from "@mui/material";
import { SearchIcon } from "../icons/CommonIcons";
import CustomDatePicker from "../components/common/CustomDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useSnackbar } from "../context/SnackbarContext";
import AddNewPatientDialog from "./AddNewPatient";

const BottomToolbar = styled(Box)({
  position: "sticky",
  bottom: 0,
  left: 0,
  width: "100%",
  background: "#ffffff",
  boxShadow: "0px -3px 12px 0px #0303030D",
  padding: "15px 20px",
  zIndex: 99,
});

type Period = "Morning" | "Afternoon" | "Evening" | "Night";
type TimeSlots = { [key in Period]: string[] };

const patientOptions = [
  { label: "John Doe", id: "1" },
  { label: "Jane Smith", id: "2" },
  { label: "Michael Johnson", id: "3" },
];

const reasons = ["Back Pain", "Headache", "Brain Tumors", "Others"];

const timeSlots: TimeSlots = {
  Morning: [
    "9:00 - 9:15 AM",
    "9:15 - 9:30 AM",
    "9:30 - 9:45 AM",
    "9:45 - 10:00 AM",
    "10:00 - 10:15 AM",
    "10:15 - 10:30 AM",
    "10:30 - 10:45 AM",
    "10:45 - 11:00 AM",
  ],
  Afternoon: [
    "12:00 - 12:15 PM",
    "12:15 - 12:30 PM",
    "12:30 - 12:45 PM",
    "12:45 - 1:00 PM",
    "1:00 - 1:15 PM",
    "1:15 - 1:30 PM",
    "1:30 - 1:45 PM",
    "1:45 - 2:00 PM",
  ],
  Evening: [
    "3:00 - 3:15 PM",
    "3:15 - 3:30 PM",
    "3:30 - 3:45 PM",
    "3:45 - 4:00 PM",
    "4:00 - 4:15 PM",
    "4:15 - 4:30 PM",
    "4:30 - 4:45 PM",
    "4:45 - 5:00 PM",
  ],
  Night: [
    "7:00 - 7:15 PM",
    "7:15 - 7:30 PM",
    "7:30 - 7:45 PM",
    "7:45 - 8:00 PM",
    "8:00 - 8:15 PM",
    "8:15 - 8:30 PM",
    "8:30 - 8:45 PM",
    "8:45 - 9:00 PM",
  ],
};

const periods: Period[] = Object.keys(timeSlots) as Period[];

const BookAppointment: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  const [addPatientDialogOpen, setPatientDialogOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());
  const [selectedPeriod, setSelectedPeriod] = React.useState<Period>(
    periods[0]
  );
  const [selectedSlot, setSelectedSlot] = React.useState<string>("");
  const [patientName, setPatientName] = React.useState<string | null>(null);
  const [reference, setReference] = React.useState<string>("");
  const [appointmentType, setAppointmentType] = React.useState<string>("New");
  const [consultationType, setConsultationType] =
    React.useState<string>("Doctor Visit");
  const [selectedReasons, setSelectedReasons] = React.useState<string[]>([]);
  const [otherReason, setOtherReason] = React.useState<string>("");

  const handleDateChange = (newValue: Dayjs | null) => {
    setSelectedDate(newValue);
  };

  const handlePeriodChange = (
    _event: React.MouseEvent<HTMLElement>,
    newPeriod: Period
  ) => {
    setSelectedPeriod(newPeriod);
    setSelectedSlot("");
  };

  const handleSlotChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSlot: string
  ) => {
    setSelectedSlot(newSlot);
  };

  const handleReasonChange = (
    _event: React.MouseEvent<HTMLElement>,
    newReasons: string[]
  ) => {
    setSelectedReasons(newReasons);
  };

  const handleAddPatientDialogOpen = () => {
    setPatientDialogOpen(true);
  };

  const handleAddPatientDialogClose = () => {
    setPatientDialogOpen(false);
  };

  return (
    <>
      <Layout title="Book Appointment">
        <Paper
          sx={{
            width: "100%",
            border: "1px solid #F4F6FC",
            boxShadow: "0px 10px 15px 0px #F7F8FC",
            backgroundColor: theme.palette.common.white,
            borderRadius: "8px",
            position: "relative",
            maxHeight: "calc(100vh - 130px)",
            overflowY: "auto",
          }}
        >
          <Stack padding={4} spacing={4}>
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <Typography variant="h2">Select Patient</Typography>
              <Button
                onClick={handleAddPatientDialogOpen}
                variant="outlined"
                color="primary"
              >
                Add New
              </Button>
            </Stack>
            <Box>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6} lg={4}>
                  <FormControl fullWidth component="fieldset">
                    <FormLabel sx={{ mb: 1 }} component="legend">
                      Select Patient
                    </FormLabel>
                    <Autocomplete
                      freeSolo
                      options={patientOptions.map((option) => option.label)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Enter patient name or id or mobile number"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                      value={patientName}
                      onInputChange={(_, newValue) => setPatientName(newValue)}
                      onChange={(_, newValue) => setPatientName(newValue)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <FormControl fullWidth component="fieldset">
                    <FormLabel sx={{ mb: 1 }} component="legend">
                      Patient ID
                    </FormLabel>
                    <TextField size="small" placeholder="Enter patient id" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <FormControl fullWidth component="fieldset">
                    <FormLabel sx={{ mb: 1 }} component="legend">
                      Mobile Number
                    </FormLabel>
                    <TextField size="small" placeholder="Mobile Number" />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <FormControl fullWidth component="fieldset">
                    <FormLabel sx={{ mb: 1 }} component="legend">
                      Email ID
                    </FormLabel>
                    <TextField size="small" placeholder="Enter email id " />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                  <FormControl fullWidth component="fieldset">
                    <FormLabel sx={{ mb: 1 }} component="legend">
                      Doctor
                    </FormLabel>
                    <TextField
                      size="small"
                      value="Neehar Pottluri"
                      InputProps={{ readOnly: true }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <FormControl fullWidth component="fieldset">
                    <FormLabel sx={{ mb: 1 }} component="legend">
                      Reference
                    </FormLabel>
                    <TextField
                      size="small"
                      placeholder="Enter reference"
                      value={reference}
                      onChange={(e) => setReference(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Appointment Type</FormLabel>
                    <RadioGroup
                      row
                      value={appointmentType}
                      onChange={(e) => setAppointmentType(e.target.value)}
                    >
                      <FormControlLabel
                        value="New"
                        control={<Radio size="small" />}
                        label="New"
                      />
                      <FormControlLabel
                        value="Review"
                        control={<Radio size="small" />}
                        label="Review"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Consultation Type
                    </FormLabel>
                    <RadioGroup
                      row
                      value={consultationType}
                      onChange={(e) => setConsultationType(e.target.value)}
                    >
                      <FormControlLabel
                        value="Doctor Visit"
                        control={<Radio size="small" />}
                        label="Doctor Visit"
                      />
                      <FormControlLabel
                        value="Video Consultation"
                        control={<Radio size="small" />}
                        label="Video Consultation"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Stack>
                  <Typography variant="h3">
                    Reason for Consultation
                  </Typography>
                  <ToggleButtonGroup
                    value={selectedReasons}
                    onChange={handleReasonChange}
                    aria-label="reason for consultation"
                    sx={{
                      mt: 2,
                      mb: 2,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    {reasons.map((reason) => (
                      <ToggleButton
                        sx={{
                          border: `1px solid ${theme.palette.grey[500]} !important`,
                          borderRadius: "50px !important",
                          padding: "4px 14px",
                          color: theme.palette.grey[500],
                          ...theme.typography.m14,
                          textTransform: "unset",
                          minHeight: "auto",
                          "&.Mui-selected": {
                            background:
                              theme.palette.primary.main + "!important",
                            color: theme.palette.common.white,
                          },
                        }}
                        key={reason}
                        value={reason}
                        aria-label={reason}
                      >
                        {reason}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Stack>
                {selectedReasons.includes("Others") && (
                  <Paper
                    sx={{
                      width: "100%",
                      border: "1px solid #E5EBFF",
                      boxShadow: "none",
                      backgroundColor: theme.palette.common.white,
                      borderRadius: "8px",
                      p: 4,
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth component="fieldset">
                          <FormLabel sx={{ mb: 1 }} component="legend">
                            Please specify
                          </FormLabel>
                          <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            placeholder="Enter Other Reason for Consultation"
                            value={otherReason}
                            onChange={(e) => setOtherReason(e.target.value)}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Paper>
                )}
              </Stack>
            </Box>
            <Box>
              <Stack spacing={2}>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography variant="h3">Select Appointment Time</Typography>
                </Stack>
                <Stack spacing={3}>
                  <Box>
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={4} lg={3}>
                        <FormControl fullWidth component="fieldset">
                          <FormLabel sx={{ mb: 1 }} component="legend">
                            Select Date
                          </FormLabel>
                          <CustomDatePicker
                            value={selectedDate}
                            onChange={handleDateChange}
                            minDate={dayjs()}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={8} lg={9}>
                        <FormControl fullWidth component="fieldset">
                          <FormLabel sx={{ mb: 1.6 }} component="legend">
                            Select Period
                          </FormLabel>
                          <ToggleButtonGroup
                            value={selectedPeriod}
                            exclusive
                            onChange={handlePeriodChange}
                            fullWidth
                            sx={{
                              gap: 4,
                            }}
                          >
                            {periods.map((period) => (
                              <ToggleButton
                                key={period}
                                value={period}
                                sx={{
                                  maxWidth: 150,
                                  border: `1px solid ${theme.palette.grey[500]} !important`,
                                  borderRadius: "50px !important",
                                  padding: "4px 14px",
                                  color: theme.palette.grey[500],
                                  ...theme.typography.m14,
                                  textTransform: "unset",
                                  minHeight: "auto",
                                  "&.Mui-selected": {
                                    background:
                                      theme.palette.primary.main +
                                      "!important",
                                    color: theme.palette.common.white,
                                  },
                                }}
                              >
                                {period} ({timeSlots[period].length})
                              </ToggleButton>
                            ))}
                          </ToggleButtonGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Typography variant="h6">{selectedPeriod}</Typography>
                    <Box mt={2}>
                      <Grid container spacing={4}>
                        {timeSlots[selectedPeriod].map((slot, index) => (
                          <Grid item key={index}>
                            <ToggleButtonGroup
                              value={selectedSlot}
                              exclusive
                              onChange={handleSlotChange}
                              fullWidth
                            >
                              <ToggleButton
                                sx={{
                                  border: `1px solid ${theme.palette.grey[500]} !important`,
                                  borderRadius: "50px !important",
                                  padding: "4px 14px",
                                  color: theme.palette.grey[500],
                                  ...theme.typography.m14,
                                  textTransform: "unset",
                                  minHeight: "auto",
                                  "&.Mui-selected": {
                                    background:
                                      theme.palette.primary.main +
                                      "!important",
                                    color: theme.palette.common.white,
                                  },
                                }}
                                value={slot}
                                fullWidth
                              >
                                {slot}
                              </ToggleButton>
                            </ToggleButtonGroup>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Box>
                </Stack>
              </Stack>
            </Box>
          </Stack>
          <BottomToolbar>
            <Stack
              width={"100%"}
              direction={"row"}
              justifyContent={"flex-end"}
              spacing={2}
            >
              <Button variant="outlined" color="secondary">
                Cancel
              </Button>
              <Button
                onClick={() =>
                  showSnackbar("Appointment Booked Successfully", "success")
                }
                variant="contained"
                color="primary"
              >
                Book Appointment
              </Button>
            </Stack>
          </BottomToolbar>
        </Paper>
      </Layout>
      <AddNewPatientDialog
        open={addPatientDialogOpen}
        onClose={handleAddPatientDialogClose}
      />
    </>
  );
};

export default BookAppointment;
