import { useState } from 'react';
import { Form, Image, Button, InputGroup } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import axiosInstance from '../../axios/axios';
import Helper from '../../utils/helper';
import { ForgetPasswordInterface } from '../../interface/auth.interface';
import { forgetPasswordSchema } from '../../schema/authschema';
import logo from '../../assets/images/avalon-logo-black.png';
import AlertMessage from '../common/AlertMessage';
import Loader from '../common/Loader';

function forgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState([]);
  const [alert, setAlert] = useState({ type: '', message: '', display: false });
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<ForgetPasswordInterface>({
    mode: 'onChange',
    resolver: yupResolver(forgetPasswordSchema),
  });

  const submitHandler = async (values: ForgetPasswordInterface) => {
    setAlert({ type: '', message: '', display: false });
    setIsLoading(true);
    try {
      await axiosInstance.put('auth/forgot-password', {
        email: values.email,
      });
      setAlert({
        type: 'success',
        message: 'If your email exists in our system, we will send a link to reset password!',
        display: true,
      });

      reset();
      setIsLoading(false);
    } catch (e: any) {
      let message = e.response.data.message;
      if (e.response.status === 422) {
        message = e.response.data.message[0].errors[0];
      }
      setAlert({ type: 'danger', message: message, display: true });
      setIsLoading(false);
    }
  };

  const submitForm = () => {
    const values = getValues();
    if (isValid) {
      submitHandler(values);
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <Image src={logo} alt="Avalon" className="brand-image img-fluid" />
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Forgot your password?</p>
              <Form className="auth-wrap" onSubmit={handleSubmit(submitForm)}>
                <InputGroup className="mb-1">
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    {...register('email')}
                    name="email"
                    size="lg"
                    className="h-auto mb-2"
                    isInvalid={Helper.isColError('email', formError)}
                  />
                  <InputGroup.Text id="basic-addon2">
                    <i className="fas fa-key"></i>
                  </InputGroup.Text>
                </InputGroup>
                <Form.Control.Feedback type="invalid">{Helper.getErrorMsg('email', formError)}</Form.Control.Feedback>
                <p className="invalid-feedback d-block">{errors?.email?.message}</p>

                <AlertMessage type={alert.type} message={alert.message} display={alert.display} />
                <div className="mt-3 text-center">
                  <Button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                    Reset Password <Loader isLoading={isLoading} />
                  </Button>
                  <p className="divider">
                    <span>OR</span>
                  </p>
                  <Link to="/login" className="auth-link theme-text">
                    Back to Login
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default forgetPassword;
