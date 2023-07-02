'use client';
// import { TextField, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Checkbox, FormGroup, FormLabel } from '@material-ui/core';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from "@/app/styles/useform.module.css"
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  FormLabel,
  Alert,
} from '@material-ui/core';

const UserForm = () => {
  const initialValues = {
    name: '',
    address: '',
    country: '',
    gender: '',
    hobbies: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    gender: Yup.string().required('Gender is required'),
    hobbies: Yup.array().min(1, 'Select at least one hobby'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log(values);
      alert("form submitted")
      setSubmitting(false);
    }, 500);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form className={styles.userform} onSubmit={formik.handleSubmit}>
      <TextField
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <TextField
        id="address"
        name="address"
        label="Address"
        multiline
        rows={4}
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
      />

      <FormControl>
        <InputLabel id="country-label">Country</InputLabel>
        <Select
          id="country"
          name="country"
          labelId="country-label"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.country && Boolean(formik.errors.country)}
        >
          <MenuItem value="USA">USA</MenuItem>
          <MenuItem value="Canada">Canada</MenuItem>
          <MenuItem value="UK">UK</MenuItem>
          <MenuItem value="Australia">Australia</MenuItem>
        </Select>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup
          id="gender"
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          row
          error={formik.touched.gender && Boolean(formik.errors.gender)}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">Hobbies/Interests</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.hobbies.includes('reading')}
                onChange={formik.handleChange}
                name="hobbies"
                value="reading"
              />
            }
            label="Reading"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.hobbies.includes('sports')}
                onChange={formik.handleChange}
                name="hobbies"
                value="sports"
              />
            }
            label="Sports"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.hobbies.includes('music')}
                onChange={formik.handleChange}
                name="hobbies"
                value="music"
              />
            }
            label="Music"
          />
        </FormGroup>
        {formik.touched.hobbies && Boolean(formik.errors.hobbies) && (
          <Alert severity="error">{formik.errors.hobbies}</Alert>
        )}
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
