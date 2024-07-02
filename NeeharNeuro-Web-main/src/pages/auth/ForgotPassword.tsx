import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import bgSpoke from "../../assets/bg-spokes.svg";
import doctorElement from "../../assets/doctor-element.svg";
import theme from "../../Theme";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                backgroundColor: "rgba(65, 89, 233, 1)",
                width: "100%",
                height: "100vh",
                backgroundImage: `url('${bgSpoke}')`,
                position: "relative",
                p: 6,
              }}
            >
              <Stack
                justifyContent={"center"}
                sx={{
                  height: "100%",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "300",
                      color: "#FFFFFF",
                      fontSize: "34px",
                      lineHeight: "normal",
                      maxWidth: "400px",
                      textAlign: "left",
                    }}
                  >
                    Smart Health Solutions at Your Fingertips
                  </Typography>
                </Box>
              </Stack>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  display: "flex",
                  "& > img": {
                    objectFit: "contain",
                    width: "250px",
                  },
                }}
              >
                <img src={doctorElement} />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Stack
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box sx={{ width: "100%", maxWidth: "400px" }}>
                <Stack spacing={8}>
                  <Stack spacing={2}>
                    <Typography
                      sx={{
                      fontSize: '24px',
                      lineHeight: '20px',
                      fontWeight: '700',
                      }}
                    >
                    Forget Password?
                    </Typography>
                    <Typography
                      sx={{
                        ...theme.typography.sb14,
                      }}
                    >
                      We will send you a One Time Password to this Email Id
                    </Typography>
                  </Stack>
                  <Stack spacing={3}>
                    <Stack spacing={4}>
                      <FormControl fullWidth component="fieldset">
                        <FormLabel sx={{ mb: 1 }} component="legend">
                          Email ID
                        </FormLabel>
                        <TextField size="small" placeholder="Enter email id " />
                      </FormControl>
                    
                    </Stack>
                  </Stack>
                  <Stack>
                    <Button  onClick={()=> navigate('/login')} variant="contained" fullWidth>
                    Continue
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ForgotPassword;
