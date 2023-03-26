import PropTypes from 'prop-types';
import { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useField } from 'formik';
import { styled } from '@mui/material/styles';
import Iconify from '../../../components/iconify';

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  width: '100% !important',
  margin: '15px 0px',
  '& input': {
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.default} inset !important`,
    },
  },
  '& .MuiInput-root:before': {
    borderBottom: `solid ${theme.palette.primary.main} 1px `,
  },
  '& input::placeholder': {
    [theme.breakpoints.down('md')]: {
      fontSize: '13px',
    },
    fontSize: '16px',
    paddingBottom: '5px',
  },
}));
const CustomInputBasePassword = ({ name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    // disabled: !!disabled,
    fullWidth: true,
    variant: "outlined",
    type: showPassword ? "password" : "text",
  };
  if (meta && meta.error && meta.touched) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <TextFieldCustom
    />
  );
};

CustomInputBasePassword.propTypes = {
  name: PropTypes.string,
};
export default CustomInputBasePassword;
