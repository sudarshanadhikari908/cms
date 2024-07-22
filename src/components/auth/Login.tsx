/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Image, InputGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { getProfile } from '../../redux/actions/profileAction';

import { setLoginError } from '../../redux/actions/logInAction';
import { loginSchema } from '../../schema/authschema';
import axiosInstance from '../../axios/axios';
import logo from '../../assets/images/avalon-logo-black.png';
import OTPModal from '../common/OTPModal';
import AlertMessage from '../common/AlertMessage';
import Loader from '../common/Loader';
import SessionToastMessage from '../../utils/sessionToastMessage';

function LoginAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [modalBtnColor, setModalBtnColor] = useState('primary');
  const [modalError, setModalError] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '', display: false });
  const [modalToggle, setModalToggle] = useState(false);
  const [showPassword, setShowpassword] = useState(false);
  const [sessionAlert, setSessionAlert] = useState({ type: '', message: '', display: false });

  const dispatch = useDispatch();
  const history = useHistory();

  const { error } = useSelector((state: any) => state.users);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(loginSchema),
  });
  const handleModalToggle = () => {
    setModalToggle(!modalToggle);
    setModalBtnColor('primary');
  };

  const handleOTPSubmit = async (value: string) => {
    if (value.length < 6) {
      setModalBtnColor('danger');
      setModalError(true);
    } else {
      try {
        await axiosInstance.post('/twofa/authenticate', {
          code: value,
        });
        const profileRes = await axiosInstance.get('/auth/profile');
        window.localStorage.setItem('isLoggedIn', 'true');
        dispatch(getProfile(profileRes?.data));
        history.push('/');
        setModalBtnColor('primary');
        setModalError(false);
      } catch (e) {
        setModalBtnColor('danger');
        setModalError(true);
        toast.error(e.response.data.message);
      }
    }
  };

  const submitHandler = async (values: any) => {
    setAlert({ type: '', message: '', display: false });
    setIsLoading(true);
    try {
      await axiosInstance.post('/auth/login', {
        email: values.email.toLowerCase(),
        password: values.password,
        remember: values.rememberme,
      });
      const profileRes = await axiosInstance.get('/auth/profile');
      window.localStorage.setItem('isLoggedIn', 'true');
      history.push('/');
      dispatch(getProfile(profileRes?.data));
    } catch (e) {
      let message = e.response.data.message;
      if (e.response.status === 403) {
        setModalToggle(true);
      } else {
        if (e.response.status === 422) {
          message = e.response.data.message[0].errors[0];
        }
        toast.error(message);
      }
      dispatch(setLoginError(message));

      setIsLoading(false);
    }
  };

  const submitForm = () => {
    const values = getValues();
    if (Object.keys(errors).length === 0) {
      submitHandler(values);
    }
  };

  useEffect(() => {
    if (error) {
      if (Array.isArray(error)) {
        return;
      } else {
        setAlert({ type: 'danger', message: error, display: true });
      }
    }
  }, [error]);

  useEffect(() => {
    SessionToastMessage.showSessionMessage();
  }, []);

  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
            <Image src={logo} alt="Avalon" className="brand-image img-fluid" />
          </div>
          <ToastContainer />
          <OTPModal
            modalToggle={modalToggle}
            handleModalToggle={handleModalToggle}
            handleOTPSubmit={handleOTPSubmit}
            setBtnColor={setModalBtnColor}
            btnColor={modalBtnColor}
            setModalError={setModalError}
            modalError={modalError}
          />
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>
              <Form className="pt-3 auth-wrap" onSubmit={handleSubmit(submitForm)}>
                <InputGroup className="mb-1 mt-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter Email"
                    {...register('email')}
                    name="email"
                    size="lg"
                    className="h-auto"
                  />
                  <InputGroup.Text id="basic-addon2">
                    <i className="far fa-envelope"></i>
                  </InputGroup.Text>
                </InputGroup>
                {/* @ts-ignore */}
                <p className="invalid-feedback d-block">{errors?.email?.message}</p>

                <InputGroup className="mb-1 mt-3">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Password"
                    {...register('password')}
                    name="password"
                    size="lg"
                    className="h-auto"
                  />
                  <InputGroup.Text id="basic-addon2">
                    {/* <i className="fas fa-fingerprint"></i> */}
                    <i className="fas fa-key" onClick={() => setShowpassword(!showPassword)}></i>
                  </InputGroup.Text>
                </InputGroup>
                {/* @ts-ignore */}
                <p className="invalid-feedback d-block">{errors?.password?.message}</p>

                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        {...register('rememberme')}
                        name="rememberme"
                      />
                      <i className="input-helper"></i>
                      Keep me signed in!
                    </label>
                  </div>
                </div>
                <AlertMessage type={alert.type} message={alert.message} display={alert.display} />
                <AlertMessage type={sessionAlert.type} message={sessionAlert.message} display={sessionAlert.display} />
                <div className="my-2">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In <Loader isLoading={isLoading} />
                  </button>
                </div>
                <Link to="/forgot-password" className="auth-link d-block text-center theme-text">
                  Forgot password?
                </Link>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginAccount;
