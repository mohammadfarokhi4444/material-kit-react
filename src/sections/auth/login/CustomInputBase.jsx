import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { useField } from 'formik';
import { styled } from '@mui/material/styles';

const TextFieldCustom = styled(TextField)(({ theme }) => ({
  width: "100% !important",
  margin: "15px 0px",
  "& input": {
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.paper} inset !important`,
    },
  },
}));
const CustomInputBase = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
  };
  if (meta && meta.error && meta.touched) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <TextFieldCustom
      name={name}
      label={name}
      InputProps={{
        // disableUnderline: true,
        style: {
          borderRadius: '6px',
        },
      }}
      {...configTextField}
    />
  );
};

CustomInputBase.propTypes = {
  name: PropTypes.string,
};
export default CustomInputBase;
