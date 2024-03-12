import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function App() {
  //state variable formData 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  //state variable errors
  const [errors, setErrors] = useState({});

  // it updates the form data , whenever there is a change in the input fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      //here we are spreading the previous state, which is formData using the spread operator ...
      ...formData,
      [name]: value
    });
  };

  // it handles the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      // Submit the form data
      console.log('Form submitted:', formData);
      // Reset form fields
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.username.trim()) {
      errors.username = 'Username is required';
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email address is invalid';
    }
    if (data.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px', // Adding borderRadius to round all corners
        overflow: 'hidden' // Hide any content that may overflow outside the rounded corners
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
            Registration Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                error={!!errors.username}
                id="outlined-error-helper-text-username"
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                helperText={errors.username}
                sx={{ width: '40ch', mb: 2 }}
              />
            </div>
            <div>
              <TextField
                error={!!errors.email}
                id="outlined-error-helper-text-email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                helperText={errors.email}
                sx={{ width: '40ch', mb: 2 }}
              />
            </div>
            <div>
              <TextField
                error={!!errors.password}
                id="outlined-error-helper-text-password"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                helperText={errors.password}
                sx={{ width: '40ch', mb: 2 }}
              />
            </div>
            <div>
              <TextField
                error={!!errors.confirmPassword}
                id="outlined-error-helper-text-confirm-password"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                helperText={errors.confirmPassword}
                sx={{ width: '40ch', mb: 2 }}
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <Button variant="contained" type="submit">Register</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
