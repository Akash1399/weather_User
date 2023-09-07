import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "./component.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/actions/userActions";
import { RootState } from "../redux/store/index";
import { useFormik } from "formik";
import * as Yup from "yup";

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    zip: Yup.string()
      .matches(/^[0-9]{6}$/, "Zip / Postal code must be 6 digits")
      .required("Zip / Postal code is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      zip: "",
      dob: null as dayjs.Dayjs | null, // Specify the correct type
    },
    validationSchema,
    onSubmit: (values) => {
      const { email, firstName, lastName, dob, zip } = values;
      const user = {
        email,
        firstName,
        lastName,
        DOB: dob ? dob.format("YYYY-MM-DD") : "", // Format DOB as needed
        zip: parseInt(zip, 10) || 0,
      };
      const formatDate=dob?.format("YYYY-MM-DD")
      const dobValue = formatDate?.toString() || "";

      // Split the DOB string into an array [year, month, day]
      const dobParts = dobValue.split("-").map(Number);
      const emailExists = users.some((user) => user.email === email);
      // Create a Date object from the DOB parts
      const dobO = new Date(dobParts[0], dobParts[1] - 1, dobParts[2]); // Subtract 1 from month to adjust for JavaScript's 0-based month index

      // Calculate age based on the provided DOB
      const currentDate = new Date();
      console.log(currentDate.getFullYear(), dobO);
      const age = currentDate.getFullYear() - dobO.getFullYear();
      if (age > 18) {
        if (!emailExists) {
          dispatch(registerUser(user));
          navigate("/");
        } else {
          alert("Email already exists!");
        }
      } else {
        alert("Your Ages is Less than 18, You can't Register");
      }
    },
  });

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    formik.setFieldValue("dob", date);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register User
          </Typography>
          <form onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>{" "}
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker onChange={handleDateChange} />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  inputProps={{
                    maxLength: 6,
                    onInput: (e) => {
                      e.currentTarget.value = e.currentTarget.value.slice(0, 6);
                      formik.handleChange(e);
                    },
                    pattern: "[0-9]", // Optional: To allow only numeric input
                  }}
                  value={formik.values.zip}
                  onChange={formik.handleChange}
                  error={formik.touched.zip && Boolean(formik.errors.zip)}
                  helperText={formik.touched.zip && formik.errors.zip}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <p className="link_tag" onClick={() => navigate("/")}>
                  Already have an account? Sign in
                </p>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
