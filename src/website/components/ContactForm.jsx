import React, { useState } from 'react';

// @mui components
import { Box, TextField, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// Services
import { createEnquiry } from '@/api-services/website-services/enquiryService';

const inputSlotProps ={
  label: {
    sx: {
      top: '20px',
      transform: 'translate(10px, -50%)',
      transition: 'top 0.2s ease-out, transform 0.2s ease-out',
      '&.Mui-focused': {
        top: 0,
        transform: 'translate(14px, -40%) scale(0.9)'
      },
      '&.MuiInputLabel-shrink': {
        top: 0,
        transform: 'translate(14px, -40%) scale(0.9)'
      }
    }
  }
};

const inputStyle = {
  fontSize: { xs: 13, md: 18 },
  '& .MuiOutlinedInput-root': {
    borderRadius: '24px',
  }
};

const ContactForm = ({
  enquiryTypeId,
  title = "Contact Us",
  subtitle = "Fill out the form and we’ll be in touch soon."
}) => {
  const [email, setEmail] = useState({
    enquiryTypeId,
    enquirerName: '',
    email: '',
    phone: '',
    message: '',
    company: '',
    position: ''
  });

  const [errors, setErrors] = useState({});
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email.enquirerName.trim()) newErrors.enquirerName = "Name is required.";
    else if (!/^[a-zA-Z\s'-]{2,100}$/.test(email.enquirerName)) newErrors.enquirerName = "Invalid name format.";

    if (!email.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.email)) newErrors.email = "Invalid email address.";

    if (!email.company.trim()) newErrors.company = "Company is required.";
    if (!email.position.trim()) newErrors.position = "Position is required.";

    if (!email.message.trim()) newErrors.message = "Message is required.";
    else if (email.message.length < 10) newErrors.message = "Message should be at least 10 characters.";

    return newErrors;
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setEmailSending(true);
    setEmailError(false);
    try {
      console.log(email);
      const response = await createEnquiry(email);
      if (response) {
        setIsEmailSent(true);
      }
    } catch (error) {
      setEmailError(true);
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <Box
      id="contact"
      display="flex"
      flexDirection="column"
      borderRadius={15}
      boxShadow={5}
      p={4}
      sx={{
        zIndex: 10,
        background: "#fff",
        width: "100%",
        textAlign: 'center'
      }}>
      <Typography fontSize={{ xs: 18, md: 22 }} sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography fontSize={{ xs: 15, md: 18 }} sx={{ fontWeight: 400, mb: 2 }}>
        {subtitle}
      </Typography>
      <form onSubmit={handleSubmitEnquiry} noValidate style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box display='flex' flexDirection='column' width={1} gap={2}>
          <TextField
            fullWidth
            label="Name"
            name="enquirerName"
            required
            onChange={handleChange}
            error={!!errors.enquirerName}
            helperText={errors.enquirerName}
            sx={inputStyle}
            slotProps={inputSlotProps}/>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            required
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={inputStyle}
            slotProps={inputSlotProps}/>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            type="tel"
            onChange={handleChange}
            sx={inputStyle}
            slotProps={inputSlotProps}/>
          <TextField
            fullWidth
            label="Company"
            name="company"
            required
            onChange={handleChange}
            error={!!errors.company}
            helperText={errors.company}
            sx={inputStyle}
            slotProps={inputSlotProps}/>
          <TextField
            fullWidth
            label="Position"
            name="position"
            required
            onChange={handleChange}
            error={!!errors.position}
            helperText={errors.position}
            sx={inputStyle}
            slotProps={inputSlotProps}/>
          <TextField
            fullWidth
            label="Message"
            name="message"
            multiline
            rows={6}
            required
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            sx={inputStyle}
            slotProps={inputSlotProps}/>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.06)',
                color: '#000',
                fontSize: { xs: '1rem', md: '1.25rem' },
                fontWeight: 'bold',
                padding: '10px 10px',
                letterSpacing: '0.05rem',
                borderRadius: '24px',
                '&:hover': {
                    backgroundColor: 'rgba(211, 211, 211, 1)'
                }
              }}
              disabled={emailSending}>
              {emailSending ? <CircularProgress size={24} /> : 'Send Enquiry'}
            </Button>
            {
              isEmailSent && (
                <Typography variant="body1" sx={{ color: 'green', marginLeft: 2 }}>
                  Your message has been sent!
                </Typography>
              )
            }
            {
              emailError && (
                <Typography variant="body1" sx={{ color: 'red', marginLeft: 2 }}>
                  Error sending email. Please try again.
                </Typography>
              )
            }
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ContactForm;