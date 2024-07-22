import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Helper from '../../utils/helper';
import axiosInstance from '../../axios/axios';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterInterface } from '../../interface/auth.interface';
import { registerSchema } from '../../schema/authschema';

function RegisterAccount() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm<RegisterInterface>({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
  });
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [formError, setFormError] = useState<any[]>([]);

  const submitHandler = async (values: RegisterInterface) => {
    try {
      await axiosInstance.post('/auth/register', values);
      setSuccessSubmit(true);
      setFormError([]);
    } catch (err: any) {
      if (Array.isArray(err?.response?.data?.message)) {
        setFormError(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };
  // };

  const submitForm = () => {
    const values = getValues();

    if (isValid) {
      submitHandler(values);

      reset();
    }
  };

  return (
    <>
      {!successSubmit ? (
        <div className="register-page">
          <div className="register-box">
            <div className="register-logo">
              <Image src="/src/assets/images/avalon-logo-black.png" alt="Avalon" className="brand-image img-fluid" />
            </div>
            <ToastContainer />
            <p className="login-box-msg">Register your new account</p>
            <Form className="pt-3" onSubmit={handleSubmit(submitForm)}>
              <Form.Group className="d-flex search-field">
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  {...register('username')}
                  size="lg"
                  className="h-auto mb-2"
                  name="username"
                  isInvalid={Helper.isColError('username', formError)}
                />
              </Form.Group>
              <p style={{ color: 'red' }}> {errors.username?.message} </p>
              <Form.Control.Feedback type="invalid">{Helper.getErrorMsg('username', formError)}</Form.Control.Feedback>
              <Form.Group className="d-flex search-field">
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  {...register('email')}
                  name="email"
                  size="lg"
                  className="h-auto mb-2"
                  isInvalid={Helper.isColError('email', formError)}
                />
              </Form.Group>
              <p style={{ color: 'red' }}> {errors.email?.message} </p>
              <Form.Control.Feedback type="invalid">{Helper.getErrorMsg('email', formError)}</Form.Control.Feedback>

              <Form.Group className="d-flex search-field">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  {...register('password')}
                  name="password"
                  size="lg"
                  className="h-auto mb-2"
                  isInvalid={Helper.isColError('password', formError)}
                />
              </Form.Group>
              <p style={{ color: 'red' }}> {errors.password?.message} </p>
              <Form.Control.Feedback type="invalid">{Helper.getErrorMsg('password', formError)}</Form.Control.Feedback>

              <Form.Group className="d-flex search-field">
                <Form.Control
                  type="name"
                  placeholder="Enter Name"
                  {...register('name')}
                  size="lg"
                  className="h-auto mb-2"
                  name="name"
                  isInvalid={Helper.isColError('name', formError)}
                />
              </Form.Group>
              <Form.Control.Feedback type="invalid">{Helper.getErrorMsg('name', formError)}</Form.Control.Feedback>
              <p style={{ color: 'red' }}> {errors.name?.message} </p>
              <div className="mt-3">
                <Button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">
                  Register
                </Button>
              </div>
              <p className="mb-1 forgotPassword_Text">
                <Link to="/login">Already have an account?</Link>
              </p>
            </Form>
          </div>
        </div>
      ) : (
        <h5>Confirmation mail has been sent to your email</h5>
      )}
    </>
  );
}

export default RegisterAccount;
