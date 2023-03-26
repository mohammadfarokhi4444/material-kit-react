import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Checkbox, Typography, CircularProgress } from '@mui/material';

// hook
import { useTranslation } from 'react-i18next';
// Yup
import * as Yup from 'yup';
// formik
import { Form, Formik } from 'formik';
// components
import { loginUser } from '../../../contexts/UserContext';
import useUserDispatch from '../../../hooks/useUserDispatch';
import CustomInputBasePassword from './CustomInputBasePassword';
import CustomInputBase from './CustomInputBase';
import SubmitButtonFill from './SubmitButtonFill';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const userDispatch = useUserDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const ValidationSchema = Yup.object({
    email: Yup.string().required(t('login.required')),
    password: Yup.string().required(t('login.required')),
  });

  const InitialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values) => {
    await loginUser(values.email, values.password, userDispatch, navigate, setIsLoading, setErrors);
  };

  return (
    <>
      <Formik initialValues={InitialValues} validationSchema={ValidationSchema} onSubmit={handleSubmit}>
        <Form>
          <CustomInputBase name="email" />
          <CustomInputBasePassword name="password" />
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            {t("login.remember")}
          </Link>
          <SubmitButtonFill disabled={isLoading}>
            {!isLoading ? (
              <Typography variant={'body3'}>{t('login.login')}</Typography>
            ) : (
              <CircularProgress size={20} />
            )}
          </SubmitButtonFill>
        </Form>
      </Formik>
      {errors[0] && errors.map((el, index) => <Typography key={index}>{el}</Typography>)}
    </>
  );
}
