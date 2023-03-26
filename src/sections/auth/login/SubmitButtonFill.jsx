import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { useFormikContext } from 'formik';

const SubmitButtonFill = ({ disable, children }) => {
  const { submitForm } = useFormikContext();
  const handleSubmit = () => {
    submitForm();
  };
  const configButton = {
    variant: 'contained',
    disable,
    onClick: handleSubmit,
  };
  return (
    <Button
      fullWidth
      sx={{
        height: '45px',
        borderRadius: '10px',
        backgroundColor: 'primary.main',
        color: 'common.white',
        '&:hover': {
          bgcolor: 'primary.main',
        },
      }}
      {...configButton}
    >
      {children}
    </Button>
  );
};
SubmitButtonFill.propTypes = {
  disable: PropTypes.any,
  children: PropTypes.any,
};

export default SubmitButtonFill;
