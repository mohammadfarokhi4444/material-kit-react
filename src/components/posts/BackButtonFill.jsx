import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const BackButtonFill = ({ text, onClick }) => {
  const configButton = {
    variant: 'contained',
  };
  return (
    <Button
      fullWidth
      onClick={onClick}
      sx={{
        height: '45px',
        borderRadius: '10px',
        backgroundColor: 'info.main',
        color: 'common.white',
        '&:hover': {
          bgcolor: 'info.main',
        },
      }}
      {...configButton}
    >
      {text}
    </Button>
  );
};

BackButtonFill.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};
export default BackButtonFill;
