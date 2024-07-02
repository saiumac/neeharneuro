import React, { useEffect, useState } from "react";
import theme from "../../Theme";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { DownloadIcon, PrintIcon, ShareIcon } from "../../icons/ButtonIcons";
import {
  BpColuredIcon,
  HeartColuredIcon,
  PulseColuredIcon,
  TempColuredIcon,
  WeightColuredIcon,
} from "../../icons/CommonIcons";
import TableSkeletonLoader from "../../components/table/TableSkeletonLoader";

const columns = [
  { id: "drugName", label: "Drug Name" },
  { id: "days", label: "Days" },
  { id: "frequency", label: "Frequency" },
  { id: "instructions", label: "Instructions" },
];

const patientData = [
  {
    id: "1",
    drugName: "Golcerin-GM (750)",
    days: "1 Week",
    frequency: [1, 0, 1],
    instructions: "After Food",
  },
];

const SquareIconButton = styled(IconButton)({
  width: "36px",
  height: "36px",
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: "3px",
  color: theme.palette.primary.main,
});
const StyledLi = styled("li")({
  ...theme.typography.sb14,
  color: theme.palette.text.secondary,
});

const TreatmentHistory: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Stack width="100%">
      <Paper
        sx={{
          width: "100%",
          boxShadow: "none",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={2}>
            <List
            sx={{
                position: 'sticky',
                top:100,
            }} 
            disablePadding>
              {[
                { text: "12 Jun 2024" },
                { text: "25 May 2024" },
                { text: "15 May 2024" },
              ].map(({ text }, index) => (
                <ListItem
                  key={text + index}
                  disablePadding
                  sx={{
                    position: "relative",
                    "&:not(:last-child)": {
                      marginBottom: "30px",
                      "&::before": {
                        content: '""',
                        height: "100%",
                        borderRight: "1px dashed #A4ADCE",
                        position: "absolute",
                        bottom: -40,
                        left: "50%",
                        transform: "translateX(-50%)",
                      },
                    },
                  }}
                >
                  <ListItemButton
                    selected={text === "25 May 2024"}
                    sx={{
                      backgroundColor: "#F7F8FC",
                      borderRadius: "8px",
                      color: theme.palette.primary.main,
                      width: "100%",
                      height: "auto",
                      border: `1px solid #F7F8FC`,
                      padding: "4px",
                      "&:hover": {
                        border: `1px dashed ${theme.palette.primary.main}`,
                      },
                      "&.Mui-selected": {
                        border: `1px dashed ${theme.palette.primary.main}`,
                        color: theme.palette.common.white,
                        backgroundColor: "#ffffff",
                        "& .MuiListItemText-root": {
                          backgroundColor: theme.palette.primary.main,
                        },
                        "&:hover": {
                          backgroundColor: "#ffffff",
                          color: theme.palette.common.white,
                          border: `1px dashed ${theme.palette.primary.main}`,
                        },
                      },
                    }}
                  >
                    <ListItemText
                      primary={text}
                      sx={{
                        borderRadius: "8px",
                        whiteSpace: "nowrap",
                        m: 0,
                        p: "3px",
                        "& .MuiTypography-root": {
                          textAlign: "center",
                          ...theme.typography.sb14,
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={10}>
            <Paper
              sx={{
                backgroundColor: "#F7F8FC",
                p: 2,
                boxShadow: "none",
              }}
            >
              <Stack spacing={4}>
                <Box sx={{ p: 3 }}>
                  <Grid container alignItems={"center"}>
                    <Grid item xs={6} md={3}>
                      <Stack spacing={0.4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Date
                        </Typography>
                        <Typography variant="subtitle1" color="text.primary">
                          25/05/2024
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Stack spacing={0.4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Time Slot
                        </Typography>
                        <Typography variant="subtitle1" color="text.primary">
                          11:15 - 11:30 AM
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Stack spacing={0.4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Doctor
                        </Typography>
                        <Typography variant="subtitle1" color="text.primary">
                          Neehar Pottluri
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Stack
                        justifyContent={"flex-end"}
                        spacing={2}
                        direction={"row"}
                      >
                        <SquareIconButton
                          sx={{
                            "& > svg path": {
                              stroke: theme.palette.primary.main,
                            },
                          }}
                        >
                          <PrintIcon />
                        </SquareIconButton>
                        <SquareIconButton
                          sx={{
                            "& > svg path": {
                              fill: theme.palette.primary.main,
                            },
                          }}
                        >
                          <DownloadIcon />
                        </SquareIconButton>
                        <SquareIconButton
                          sx={{
                            "& > svg path": {
                              fill: theme.palette.primary.main,
                            },
                          }}
                        >
                          <ShareIcon />
                        </SquareIconButton>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
                <Paper
                  sx={{
                    width: "100%",
                    border: "1px solid #E7EBF9",
                    boxShadow: "none",
                    backgroundColor: theme.palette.common.white,
                    borderRadius: "8px",
                    p: 4,
                  }}
                >
                  <Stack spacing={4}>
                    <Typography variant="h3">Vital Signs</Typography>
                    <Box>
                      <Grid container>
                        <Grid xs={4} md={2.4}>
                          <Stack direction={"row"} spacing={1}>
                            <BpColuredIcon />
                            <Stack spacing={1}>
                              <Typography
                                lineHeight="20px"
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Blood Pressure
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                              >
                                120/80
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid xs={4} md={2.4}>
                          <Stack direction={"row"} spacing={1}>
                            <PulseColuredIcon />
                            <Stack spacing={1}>
                              <Typography
                                lineHeight="20px"
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Pulse
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                              >
                                95 BPM
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid xs={4} md={2.4}>
                          <Stack direction={"row"} spacing={1}>
                            <HeartColuredIcon />
                            <Stack spacing={1}>
                              <Typography
                                lineHeight="20px"
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Heart Rate
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                              >
                                95 BPM
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid xs={4} md={2.4}>
                          <Stack direction={"row"} spacing={1}>
                            <TempColuredIcon />
                            <Stack spacing={1}>
                              <Typography
                                lineHeight="20px"
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Temperature
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                              >
                                98.4 F
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid xs={4} md={2.4}>
                          <Stack direction={"row"} spacing={1}>
                            <WeightColuredIcon />
                            <Stack spacing={1}>
                              <Typography
                                lineHeight="20px"
                                variant="subtitle2"
                                color="text.secondary"
                              >
                                Weight
                              </Typography>
                              <Typography
                                variant="subtitle1"
                                color="text.secondary"
                              >
                                64 KG
                              </Typography>
                            </Stack>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </Stack>
                </Paper>
                <Paper
                  sx={{
                    width: "100%",
                    border: "1px solid #E7EBF9",
                    boxShadow: "none",
                    backgroundColor: theme.palette.common.white,
                    borderRadius: "8px",
                    p: 4,
                  }}
                >
                  <Stack spacing={4}>
                    <Typography variant="h3">Medical History</Typography>
                    <Box>
                      <Grid spacing={3} container>
                        {[
                          { text: "Diabetes" },
                          { text: " Thyroid Disease" },
                          { text: "Headache one sided" },
                        ].map(({ text }, index) => (
                          <Grid key={index} item xs={12} md={6}>
                            <StyledLi> {text} </StyledLi>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Stack>
                </Paper>
                <Paper
                  sx={{
                    width: "100%",
                    border: "1px solid #E7EBF9",
                    boxShadow: "none",
                    backgroundColor: theme.palette.common.white,
                    borderRadius: "8px",
                    p: 4,
                  }}
                >
                  <Stack spacing={4}>
                    <Typography variant="h3">Complaints</Typography>
                    <Box>
                      <Grid spacing={3} container>
                        {[
                          { text: "Low Back Pain" },
                          { text: "Calf Pain" },
                          { text: "History Of Stress Present" },
                          { text: "Repetitive Thoughts" },
                          { text: "Bilateral" },
                          { text: "History Of Fragmented Sleep Present" },
                        ].map(({ text }, index) => (
                          <Grid key={index} item xs={12} md={6}>
                            <StyledLi> {text} </StyledLi>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Stack>
                </Paper>
                <Paper
                  sx={{
                    width: "100%",
                    border: "1px solid #E7EBF9",
                    boxShadow: "none",
                    backgroundColor: theme.palette.common.white,
                    borderRadius: "8px",
                    p: 4,
                  }}
                >
                  <Stack spacing={4}>
                    <Typography variant="h3">Observations</Typography>
                    <Box>
                      <Grid spacing={3} container>
                        {[
                          { text: "Abduction" },
                          { text: "Peripheral pulses palpable" },
                          { text: "Repetitive Thoughts" },
                          { text: "Calf Pain" },
                          { text: "Bilateral" },
                          { text: "History Of Fragmented Sleep Present" },
                        ].map(({ text }, index) => (
                          <Grid key={index} item xs={12} md={6}>
                            <StyledLi> {text} </StyledLi>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Stack>
                </Paper>
                <Paper
                  sx={{
                    width: "100%",
                    border: "1px solid #E7EBF9",
                    boxShadow: "none",
                    backgroundColor: theme.palette.common.white,
                    borderRadius: "8px",
                    p: 4,
                  }}
                >
                  <Stack spacing={4}>
                    <Typography variant="h3">Diagnoses</Typography>
                    <Box
                      sx={{
                        backgroundColor: "#F7F8FC",
                        p: 3,
                        borderRadius: "10px",
                      }}
                    >
                      <Typography
                        textAlign={"center"}
                        variant="subtitle2"
                        color="#8699BD"
                      >
                        No Diagnoses
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
                <Paper
                  sx={{
                    width: "100%",
                    border: "1px solid #E7EBF9",
                    boxShadow: "none",
                    backgroundColor: theme.palette.common.white,
                    borderRadius: "8px",
                    p: 4,
                  }}
                >
                  <Stack spacing={4}>
                    <Typography variant="h3">Investigation</Typography>
                    <Box>
                      <Grid spacing={3} container>
                        {[
                          { text: "Carotid Doppler Normal" },
                          { text: "S Lipid Profile Normal" },
                          { text: "Uric Acid Normal" },
                          { text: "Serum Iron Levels Normal" },
                          { text: "History Of Fragmented Sleep Present" },
                        ].map(({ text }, index) => (
                          <Grid key={index} item xs={12} md={6}>
                            <StyledLi> {text} </StyledLi>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Stack>
                </Paper>
                <Paper
                  sx={{
                    width: "100%",
                    border: "1px solid #E7EBF9",
                    boxShadow: "none",
                    backgroundColor: theme.palette.common.white,
                    borderRadius: "8px",
                    p: 4,
                  }}
                >
                  <Stack spacing={4}>
                    <Typography variant="h3">Prescription</Typography>
                    <Box>
                      <TableContainer sx={{ maxHeight: "calc(100vh - 290px)" }}>
                        <Table stickyHeader>
                          <TableHead>
                            <TableRow>
                              {columns.map((column, index) => (
                                <TableCell key={index}>
                                  {" "}
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {isLoading ? (
                              <TableSkeletonLoader
                                rowsPerPage={4}
                                columnCount={columns.length}
                                hasActions={true}
                              />
                            ) : (
                              patientData.map((patientData) => (
                                <TableRow key={patientData.id}>
                                  <TableCell>{patientData.drugName}</TableCell>
                                  <TableCell>{patientData.days}</TableCell>
                                  <TableCell>
                                    <Stack
                                      direction={"row"}
                                      sx={{
                                        "& .MuiBox-root": {
                                          padding: " 0 10px",
                                          "&:not(:last-child)": {
                                            borderRight: "1px solid #E7EBFF",
                                          },
                                          "&last-child": {
                                            paddingLeft: "0",
                                          },
                                        },
                                      }}
                                    >
                                      <Box>{patientData.frequency[0]} M</Box>
                                      <Box>{patientData.frequency[1]} A</Box>
                                      <Box>{patientData.frequency[2]} N</Box>
                                    </Stack>
                                  </TableCell>
                                  <TableCell>
                                    {patientData.instructions}
                                  </TableCell>
                                </TableRow>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Stack>
                </Paper>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default TreatmentHistory;
