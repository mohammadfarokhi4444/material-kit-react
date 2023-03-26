import PropTypes from 'prop-types';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useField } from 'formik';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import Iconify from '../../../components/iconify';

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  width: '100% !important',
  margin: '15px 0px',
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.common.white,
  },
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.common.white,
    paddingInline: '10px',
  },
  '& input': {
    '&:-webkit-autofill': {
      WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset !important`,
    },
  },
}));
const CustomInputOutlinePassword = ({ name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    fullWidth: true,
    variant: 'outlined',
    type: showPassword ? 'text' : 'password',
  };
  if (meta && meta.error && meta.touched) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <TextFieldCustom
      InputProps={{
        style: {
          flexDirection: 'row-reverse',
        },
        startAdornment: (
          <InputAdornment position="start" sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...configTextField}
    />
  );
};
CustomInputOutlinePassword.propTypes = {
  name: PropTypes.string,
};

export default CustomInputOutlinePassword;
