import PropTypes from 'prop-types';
import { Box, Grid, Popover, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import BackButtonFill from './BackButtonFill';
import CustomInputOutline from './CustomInputOutline';
import SubmitButtonFill from './SubmitButtonFill';
import { updatePost } from '../../apis/posts';

export default function PopUpEdit({ editItem, open, setOpen, setDataPosts, dataPosts, handleCloseMenu }) {
  const { t } = useTranslation();

  const ValidationSchema = Yup.object({
    title: Yup.string().required(t('all.required')),
    body: Yup.string().required(t('all.required')),
  });

  const handleSubmit = async (values) => {
    const res = await updatePost(editItem.id, values);
    if (res.success) {
      const newData = [...dataPosts];
      const index = newData.findIndex((el) => el.id === editItem.id);
      if (index > -1) {
        newData[index] = Object.assign(newData[index], values);
        setDataPosts(newData);
      }
    }
    setOpen(false);
  };
  console.log(open);
  return (
    <Popover
      open={Boolean(open)}
      anchorReference={'none'}
      onClose={handleCloseMenu}
      PaperProps={{
        sx: {
          p: 10,
          top: '25%',
          left: '20%',
          width: '60%',
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
          },
        },
      }}
    >
      <Formik
        enableReinitialize
        initialValues={{
          title: editItem?.title || '',
          body: editItem?.body || '',
        }}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Grid container columns={12} display="flex" alignItems="center">
            <Grid item xs={12} sm={3}>
              {t('dashboard.titleTable')}
            </Grid>
            <Grid item xs={12} sm={9}>
              <CustomInputOutline name="title" />
            </Grid>
            <Grid item xs={12} sm={3}>
              {t('dashboard.bodyTable')}
            </Grid>
            <Grid item xs={12} sm={9}>
              <CustomInputOutline multiline name="body" />
            </Grid>
            <Box
              width="100%"
              display="flex"
              justifyContent="space-around"
              sx={{
                my: '2%',
              }}
            >
              <Grid item xs={12} sm={5} bgcolor="red">
                <SubmitButtonFill>
                  <Typography variant={'body3'}>{t('all.edit')}</Typography>
                </SubmitButtonFill>
              </Grid>
              <Grid item xs={12} sm={5}>
                <BackButtonFill
                  onClick={() => {
                    setOpen(null);
                  }}
                  text={t('all.back')}
                />
              </Grid>
            </Box>
          </Grid>
        </Form>
      </Formik>
    </Popover>
  );
}

PopUpEdit.propTypes = {
  open: PropTypes.object,
  editItem: PropTypes.object,
  setOpen: PropTypes.func,
  setDataPosts: PropTypes.func,
  dataPosts: PropTypes.array,
  handleCloseMenu: PropTypes.func,
};
