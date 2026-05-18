import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { createEnquiry } from '@/api-services/website-services/enquiryService';
import { useTranslation } from 'react-i18next';

const inputSlotProps = {
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
  title = "",
  subject = "",
  subtitle = ""
}) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState({
    enquiryTypeId,
    enquirerName: '',
    email: '',
    phone: '',
    message: '',
    subject: subject,
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
    if (!email.enquirerName.trim()) newErrors.enquirerName = t('common.form.validation.nameRequired');
    else if (!/^[a-zA-Z\s'-]{2,100}$/.test(email.enquirerName)) newErrors.enquirerName = t('common.form.validation.nameInvalid');

    if (!email.email.trim()) newErrors.email = t('common.form.validation.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.email)) newErrors.email = t('common.form.validation.emailInvalid');

    if (!email.company.trim()) newErrors.company = t('common.form.validation.companyRequired');
    if (!email.position.trim()) newErrors.position = t('common.form.validation.positionRequired');

    if (!email.message.trim()) newErrors.message = t('common.form.validation.messageRequired');
    else if (email.message.length < 10) newErrors.message = t('common.form.validation.messageTooShort');

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
      const response = await createEnquiry(email);
      if (response) setIsEmailSent(true);
    } catch (error) {
      setEmailError(true);
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <Box
      id="contact"
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 15,
        boxShadow: 5,
        p: 4,
        zIndex: 10,
        background: "#fff",
        width: "100%",
        textAlign: 'center'
      }}>
      <Typography sx={{ fontSize: { xs: 18, md: 22 }, fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: { xs: 15, md: 18 }, fontWeight: 400, mb: 2 }}>
        {subtitle}
      </Typography>
      <form onSubmit={handleSubmitEnquiry} noValidate style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 1, gap: 2 }}>
          <TextField
            fullWidth
            label={t('common.form.name')}
            name="enquirerName"
            required
            onChange={handleChange}
            error={!!errors.enquirerName}
            helperText={errors.enquirerName}
            sx={inputStyle}
            slotProps={inputSlotProps}/>
          <TextField
            fullWidth
            label={t('common.form.email')}
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
            label={t('common.form.phone')}
            name="phone"
            type="tel"
            onChange={handleChange}
            sx={inputStyle}
            slotProps={inputSlotProps}/>
          <TextField
            fullWidth
            label={t('common.form.company')}
            name="company"
            required
            onChange={handleChange}
            error={!!errors.company}
            helperText={errors.company}
            sx={inputStyle}
            slotProps={inputSlotProps}/>
          <TextField
            fullWidth
            label={t('common.form.position')}
            name="position"
            required
            onChange={handleChange}
            error={!!errors.position}
            helperText={errors.position}
            sx={inputStyle}
            slotProps={inputSlotProps}/>
          <TextField
            fullWidth
            label={t('common.form.message')}
            name="message"
            multiline
            rows={6}
            required
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            sx={inputStyle}
            slotProps={inputSlotProps}/>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                '&:hover': { backgroundColor: 'rgba(211, 211, 211, 1)' }
              }}
              disabled={emailSending}>
              {emailSending ? <CircularProgress size={24} /> : t('common.form.send')}
            </Button>
            {isEmailSent && (
              <Typography variant="body1" sx={{ color: 'green', marginLeft: 2 }}>
                {t('common.form.success')}
              </Typography>
            )}
            {emailError && (
              <Typography variant="body1" sx={{ color: 'red', marginLeft: 2 }}>
                {t('common.form.error')}
              </Typography>
            )}
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ContactForm;
