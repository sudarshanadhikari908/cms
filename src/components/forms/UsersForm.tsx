import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import axiosInstance from '../../axios/axios';
import Layout from '../../pages/Layout';
import ComponentHeader from '../common/ContentHeader';
import ComponentLayout from '../common/ComponentLayout';
import { userSchema } from '../../schema/userSchema';
import Helper from '../../utils/helper';
import { IUserFormInterface } from '../../interface/forms/userForm.interface';
import Loader from '../common/Loader';

const UsersForm = ({ title }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [roles, setRoles] = useState([]);
  const [serverErrors, setServerErrors] = useState<any[]>([]);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IUserFormInterface>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await axiosInstance.get('/roles?limit=100&page=1');
      if (res && res.data && res.data.results) {
        setRoles(res.data.results);
      }
    };

    fetchRoles();
  }, []);
  const submitHandler = async (values: any) => {
    setIsLoading(true);
    try {
      await axiosInstance.post('/users', {
        status: 'inactive',
        roleId: Number(values.role),
        email: values.email.trim().toLowerCase(),
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        contact: values.contact.toString(),
      });
      window.localStorage.setItem(
        'sessionmessage',
        JSON.stringify({ message: 'User created successfully!', type: 'success' }),
      );
      history.push('/users');
    } catch (e) {
      if (e.response.status == 422) {
        setServerErrors(e?.response?.data?.message);
      } else {
        const message = e.response.data.message;
        toast.error(message);
      }
      setIsLoading(false);
    }
  };

  const submitForm = async () => {
    const values = getValues();
    if (Object.keys(errors).length === 0) {
      await submitHandler(values);
    }
  };

  const handleInputChange = (e: any) => {
    if (serverErrors.length !== 0) {
      setServerErrors(
        serverErrors.filter((item: any) => {
          return item.name !== e.target.name;
        }),
      );
    }
  };
  return (
    <Layout>
      <ComponentHeader title={title} needCreateBtn={false} createUrl="" />
      <ComponentLayout>
        <Form onSubmit={handleSubmit(submitForm)}>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-6">
                  <Form.Group>
                    <Form.Label className="require">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      {...register('firstName', {
                        onChange: handleInputChange,
                      })}
                      isInvalid={Helper.isColError('firstName', serverErrors) || errors?.firstName?.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {Helper.getErrorMsg('firstName', serverErrors)}
                    </Form.Control.Feedback>
                    <p className="invalid-feedback">{errors?.firstName?.message}</p>
                  </Form.Group>
                </div>
                <div className="col-sm-6">
                  <Form.Group>
                    <Form.Label className="require">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      {...register('lastName', {
                        onChange: handleInputChange,
                      })}
                      isInvalid={Helper.isColError('lastName', serverErrors) || errors?.lastName?.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {Helper.getErrorMsg('lastName', serverErrors)}
                    </Form.Control.Feedback>
                    <p className="invalid-feedback">{errors?.lastName?.message}</p>
                  </Form.Group>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6">
                  <Form.Group>
                    <Form.Label className="require">Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      {...register('email', {
                        onChange: handleInputChange,
                      })}
                      isInvalid={Helper.isColError('email', serverErrors) || errors?.email?.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {Helper.getErrorMsg('email', serverErrors)}
                    </Form.Control.Feedback>
                    <p className="invalid-feedback">{errors?.email?.message}</p>
                  </Form.Group>
                </div>
                <div className="col-sm-6">
                  <Form.Group>
                    <Form.Label className="require">Role</Form.Label>
                    <Form.Select
                      className="form-control"
                      {...register('role', {
                        onChange: handleInputChange,
                      })}
                      isInvalid={Helper.isColError('role', serverErrors) || errors?.role?.message}
                    >
                      <option value="">Select Role</option>
                      {roles.map((role: any, key: number) => {
                        return (
                          <option key={key} value={role.id}>
                            {role.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                    <p className="invalid-feedback">{errors?.role?.message}</p>
                  </Form.Group>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-6">
                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="phone"
                      placeholder="Phone Number"
                      {...register('contact', {
                        onChange: handleInputChange,
                      })}
                      isInvalid={Helper.isColError('contact', serverErrors) || errors?.contact?.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {Helper.getErrorMsg('contact', serverErrors)}
                    </Form.Control.Feedback>
                    <p className="invalid-feedback">{errors?.contact?.message}</p>
                  </Form.Group>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-sm-12">
                  <Button type="submit">
                    Submit <Loader isLoading={isLoading} />
                  </Button>
                  <Link to="/users" className="ml-2 btn btn-danger">
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </ComponentLayout>
    </Layout>
  );
};

export default UsersForm;
