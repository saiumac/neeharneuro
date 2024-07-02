import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import CustomizedDialogs from "../components/common/CustomDialog";
import dummyProfile from "../assets/images/dummy-profile.svg";

interface AddNewPatientDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddNewPatientDialog: React.FC<AddNewPatientDialogProps> = ({
  open,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <CustomizedDialogs
        title={"Add New Patient"}
        open={open}
        onClose={onClose}
        maxWidth="md"
        zIndex={9999999999}
        actions={
          <Stack
            sx={{ width: "100%" }}
            direction={"row"}
            justifyContent={"flex-end"}
          >
            <Stack spacing={2} direction={"row"} justifyContent={"flex-end"}>
              <Button onClick={onClose} color="secondary" variant="outlined">
                Cancel
              </Button>
              <Button onClick={onClose} color="primary" variant="contained">
                Save
              </Button>
            </Stack>
          </Stack>
        }
      >
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} lg={3}>
              <Box>
                {!selectedImage && (
                  <Button
                    sx={{
                      background:
                        "linear-gradient(137.29deg, #F1F4FC -12.93%, #E5EBFD 109.99%)",
                      padding: "50px",
                    }}
                    component="label"
                  >
                    <Stack spacing={2} alignItems="center">
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                      <img src={dummyProfile} alt="Upload" />
                      <Typography variant="h3">Upload Photo</Typography>
                    </Stack>
                  </Button>
                )}
                {selectedImage && (
                  <Box mt={2}>
                    <img
                      src={selectedImage}
                      alt="Selected"
                      style={{ width: "100px", height: "100px" }}
                    />
                    <Stack direction="row" spacing={1} mt={1}>
                      <Button
                        onClick={handleImageRemove}
                        color="secondary"
                        variant="outlined"
                      >
                        Remove
                      </Button>
                      <Button
                        component="label"
                        color="primary"
                        variant="outlined"
                      >
                        Edit
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleImageUpload}
                        />
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} lg={9}>
              <Stack spacing={2}>
                <Typography variant="h3">Patient Details</Typography>
                <Box>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth component="fieldset">
                        <FormLabel sx={{ mb: 1 }} component="legend">
                          Patient Name
                        </FormLabel>
                        <TextField
                          size="small"
                          placeholder="Enter Patient Name"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth component="fieldset">
                        <FormLabel sx={{ mb: 1 }} component="legend">
                            Age
                        </FormLabel>
                        <TextField  placeholder="Enter Age" fullWidth />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth component="fieldset">
                        <FormLabel sx={{ mb: 1 }} component="legend">
                        Mobile Number
                        </FormLabel>
                        <TextField placeholder="Enter Mobile Number" fullWidth />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth component="fieldset">
                        <FormLabel sx={{ mb: 1 }} component="legend">
                        Blood Group
                        </FormLabel>
                        <TextField 
                            select 
                            fullWidth
                            SelectProps={{
                                MenuProps: {
                                  disablePortal: true,
                                },
                            }}
                        >
                          {[
                            "A+",
                            "A-",
                            "B+",
                            "B-",
                            "O+",
                            "O-",
                            "AB+",
                            "AB-",
                          ].map((bloodGroup) => (
                            <MenuItem key={bloodGroup} value={bloodGroup}>
                              {bloodGroup}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth component="fieldset">
                        <FormLabel component="legend">
                          Gender
                        </FormLabel>
                        <RadioGroup row>
                          <FormControlLabel
                            value="male"
                            control={<Radio size="small"/>}
                            label="Male"
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio size="small" />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio size="small"/>}
                            label="Others"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth component="fieldset">
                        <FormLabel sx={{ mb: 1 }} component="legend">
                        Address
                        </FormLabel>
                        <TextField
                          placeholder="Enter Address"
                          fullWidth
                          multiline
                          size="small"
                          rows={4}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </CustomizedDialogs>
    </>
  );
};

export default AddNewPatientDialog;
