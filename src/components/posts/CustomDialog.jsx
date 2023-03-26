import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

const CustomDialog = ({
  showDialog,
  setShowDialog,
  text,
  warningText,
  yes,
  no,
  handleSubmitDialog,
}) => {
  const handleCloseDialog = () => {
    setShowDialog(false);
  };
  return (
    <Dialog open={showDialog} onClose={handleCloseDialog}>
      <DialogContent>
        <Typography align="center" variant="h6" component="p">
          {text}
        </Typography>
        <p>{warningText}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          {no}
        </Button>
        <Button onClick={handleSubmitDialog} color="primary">
          {yes}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomDialog.propTypes = {
  showDialog: PropTypes.bool,
  text: PropTypes.string,
  yes: PropTypes.string,
  no: PropTypes.string,
  warningText: PropTypes.string,
  setShowDialog: PropTypes.func,
  handleSubmitDialog: PropTypes.func,
};
export default CustomDialog;
