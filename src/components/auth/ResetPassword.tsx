import React, { useState } from 'react';
import { Form, Button, Image, InputGroup } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';

import axiosInstance from '../../axios/axios';
import { ResetPasswordInterface } from '../../interface/auth.interface';
import { resetCodeSchema } from '../../schema/authschema';
import Helper from '../../utils/helper';
import logo from '../../assets/images/avalon-logo-black.png';
import AlertMessage from '../common/AlertMessage';
import Loader from '../common/Loader';

function ResetPassword() {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '', display: false });
  const [formError, setFormError] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { token }: any = useParams();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<ResetPasswordInterface>({
    mode: 'onChange',
    resolver: yupResolver(resetCodeSchema),
  });

  const submitHandler = async (values: ResetPasswordInterface) => {
    setAlert({ type: '', message: '', display: false });
    setIsLoading(true);
    try {
      await axiosInstance.put('/auth/reset-password', {
        token,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      setAlert({ type: 'success', message: 'Password reset successfully!', display: true });
      setIsLoading(false);
      window.localStorage.setItem(
        'sessionmessage',
        JSON.stringify({ message: 'Password reset successfully!', type: 'success' }),
      );
      history.push('/login');
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
              <p className="login-box-msg">Reset Password</p>
              <Form className="auth-wrap pt-3" onSubmit={handleSubmit(submitForm)}>
                <InputGroup className="mb-1">
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    {...register('password')}
                    name="password"
                    size="lg"
                    className="h-auto mb-1"
                    isInvalid={Helper.isColError('password', formError)}
                  />
                  <InputGroup.Text id="basic-addon1">
                    <i className="fas fa-key"></i>
                  </InputGroup.Text>
                </InputGroup>
                <p className="invalid-feedback d-block"> {errors?.password?.message}</p>
                <Form.Control.Feedback type="invalid">
                  {Helper.getErrorMsg('password', formError)}
                </Form.Control.Feedback>
                <InputGroup className="mb-1 mt-2">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    {...register('confirmPassword')}
                    name="confirmPassword"
                    size="lg"
                    className="h-auto mb-1"
                    isInvalid={Helper.isColError('password', formError)}
                  />
                  <InputGroup.Text id="basic-addon2">
                    <i className="fas fa-key"></i>
                  </InputGroup.Text>
                  {/* </Form.Control> */}
                </InputGroup>
                <p className="invalid-feedback d-block"> {errors?.confirmPassword?.message}</p>
                <Form.Control.Feedback type="invalid">
                  {Helper.getErrorMsg('confirmpassword', formError)}
                </Form.Control.Feedback>
                <AlertMessage type={alert.type} message={alert.message} display={alert.display} />

                <div className="mt-3 text-center">
                  <Button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                    Submit <Loader isLoading={isLoading} />
                  </Button>
                  <Link to="/login" className="auth-link text-black">
                    Login
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

export default ResetPassword;
