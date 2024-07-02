import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import bgSpoke from "../../assets/bg-spokes.svg";
import doctorElement from "../../assets/doctor-element.svg";
import { EyeCloseIcon, EyeOpenIcon } from "../../icons/ButtonIcons";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
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
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "32px",
                      lineHeight: "40px",
                    }}
                  >
                    Hello!{" "}
                    <Typography
                      sx={{
                        fontWeight: "400",
                        fontSize: "20px",
                        lineHeight: "40px",
                      }}
                      component={"span"}
                    >
                      Let’s Get Started
                    </Typography>
                  </Typography>
                  <Stack spacing={3}>
                    <Stack spacing={4}>
                      <FormControl fullWidth component="fieldset">
                        <FormLabel sx={{ mb: 1 }} component="legend">
                          Email ID
                        </FormLabel>
                        <TextField size="small" placeholder="Enter email id " />
                      </FormControl>
                      <FormControl fullWidth component="fieldset">
                        <FormLabel sx={{ mb: 1 }} component="legend">
                          Password
                        </FormLabel>
                        <TextField
                          type={showPassword ? "text" : "password"}
                          size="small"
                          placeholder="Enter Password "
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                >
                                  {showPassword ? (
                                    <EyeCloseIcon />
                                  ) : (
                                    <EyeOpenIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </FormControl>
                    </Stack>
                    <Stack alignItems={"flex-end"}>
                      <Button onClick={()=> navigate('/forgot-password')} variant="text">Forgotten password?</Button>
                    </Stack>
                  </Stack>
                  <Stack>
                    <Button onClick={()=> navigate('/patient-list')} variant="contained" fullWidth>
                      Login
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

export default Login;
