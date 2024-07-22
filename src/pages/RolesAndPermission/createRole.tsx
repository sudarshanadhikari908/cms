import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import Helper from '../../utils/helper';

import ComponentLayout from '../../components/common/ComponentLayout';
import ContentHeader from '../../components/common/ContentHeader';
import Layout from '../Layout';
import CmsConfig from '../../config/cmsConfig';
import axiosInstance from '../../axios/axios';
import { IFormData, RolesData, APermissions } from '../../interface/roles/roles.interface';
import Loader from '../../components/common/Loader';

function CreateRole() {
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [checkRoleData, setCheckRoleData] = useState<RolesData>({});
  const [permissions, setPermissions] = useState<APermissions[]>([]);
  const [rolePermissions, setRolePermissions] = useState<APermissions[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  interface Params {
    id?: string;
  }

  const { id } = useParams<Params>();
  const history = useHistory();

  useEffect(() => {
    handleInitialCheck();
    getPermissions();
    if (id) {
      getInitialRoles();
    }
  }, []);

  useEffect(() => {
    getInitialPermissions();
  }, [rolePermissions]);

  const getInitialPermissions = () => {
    for (const key in checkRoleData) {
      const getPermission = rolePermissions.find((item) => checkRoleData[key]?.name == item?.description);
      if (getPermission) {
        setCheckRoleData((prevState) => {
          const tempValue = prevState[key];
          return { ...prevState, [key]: { ...tempValue, isChecked: true } };
        });
      }
    }
  };

  const getInitialRoles = async () => {
    try {
      const response = await axiosInstance.get(`/roles/${id}`);
      if (response && response.status === 200) {
        setRolePermissions(response?.data?.permission);
        const name = response?.data?.name;
        const description = response?.data?.description;
        setFormData({ ...formData, name, description });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getPermissions = async () => {
    try {
      const response = await axiosInstance.get('/permissions?limit=100');
      setPermissions(response?.data?.results);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleInitialCheck = () => {
    if (CmsConfig.modules) {
      CmsConfig.modules.map((module) => {
        if (module.name !== 'Dashboard') {
          if (module.hasSubmodules) {
            if (module.subModules) {
              module.subModules.map((subModule) => {
                if (subModule.permissions) {
                  subModule.permissions.map((permission, index) => {
                    setCheckRoleData((prevState) => {
                      return {
                        ...prevState,
                        [`${combineString(module.name)}_${combineString(subModule.name)}_${combineString(
                          permission.name,
                        )}_${index}`]: permission,
                      };
                    });
                  });
                }
              });
            }
          } else {
            if (module.permissions) {
              module.permissions.map((permission, index) => {
                setCheckRoleData((prevState) => {
                  return {
                    ...prevState,
                    [`${combineString(module.name)}_${combineString(permission.name)}_${index}`]: permission,
                  };
                });
              });
            }
          }
        }
      });
    }
  };

  const handleSelectAll = (event: { target: { checked: boolean } }) => {
    const { checked } = event.target;
    for (const key in checkRoleData) {
      setCheckRoleData((prevState) => {
        const tempValue = prevState[key];
        return { ...prevState, [key]: { ...tempValue, isChecked: checked } };
      });
    }
  };

  const handleGroupSelectAll = (event: { target: { name: string; checked: boolean } }) => {
    const { name, checked } = event.target;
    for (const key in checkRoleData) {
      if (key.includes(name)) {
        setCheckRoleData((prevState) => {
          const tempValue = prevState[key];
          return { ...prevState, [key]: { ...tempValue, isChecked: checked } };
        });
      }
    }
  };

  const handleCheckInputChange = (event: { target: { checked: boolean; name: string; value: string } }) => {
    const { checked, name, value } = event.target;
    const tempValue = { ...JSON.parse(value), isChecked: checked };
    setCheckRoleData({ ...checkRoleData, [name]: tempValue });
  };

  const handleInputChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    if (name === 'name') {
      if (value.length < 3) {
        setErrors('Role name must be atleast 3 characters.');
        setFormData({ ...formData, [name]: value });
        return;
      }
      if (value.length > 33) {
        setErrors('Role name should not exceed 32 characters.');
        setFormData({ ...formData, [name]: value });
        return;
      }
      if (!/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/.test(value)) {
        setErrors('Role name must contain letters only.');
        setFormData({ ...formData, [name]: value });
        return;
      }
      setErrors('');
      setFormData({ ...formData, [name]: value });
    }
  };

  const getViewPermissionsId = () => {
    const getPermission = permissions.find((item) => item.path == '/permissions' && item.method == 'get');
    return getPermission?.id;
  };

  const arrangeFormData = () => {
    const { name, description } = formData;
    const arrangedFormData: IFormData = { name, description, permissions: [] };
    for (const key in checkRoleData) {
      const getPermission = permissions.find(
        (item) => checkRoleData[key]?.name == item?.description && checkRoleData[key]?.isChecked === true,
      );
      if (getPermission) {
        arrangedFormData['permissions'].push(getPermission.id);
      }
    }
    const allPermissionsViewId = getViewPermissionsId();
    if (allPermissionsViewId) {
      arrangedFormData['permissions'].push(allPermissionsViewId);
    }
    return arrangedFormData;
  };

  const handleRoleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.name !== '' && errors.length === 0) {
      const payload = arrangeFormData();
      // allow to create role with empty permissions
      // there will always be 1 permission by default set in above function
      // if (payload['permissions'].length < 2) {
      //   toast.error('Select atleast one permission');
      //   return;
      // }
      setIsLoading(true);
      try {
        const response = await axiosInstance.post('/roles', payload);
        if (response && response.status === 201) {
          window.localStorage.setItem(
            'sessionmessage',
            JSON.stringify({ message: 'Role created successfully!', type: 'success' }),
          );
          history.push('/roles-and-permissions');
        }
      } catch (error) {
        // need proper error handling display
        if (error.response.status == 422) {
          setServerErrors(error?.response?.data?.message);
        } else {
          toast.error(error.response.data.message);
        }
        setIsLoading(false);
      }
    } else {
      if (formData.name === '') {
        setErrors('Role is required');
      }
    }
  };

  const handleRoleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.name !== '' && errors.length === 0) {
      const form = event.currentTarget;
      // if (form.checkValidity() === false) {
      //   event.preventDefault();
      //   event.stopPropagation();
      // }

      // setValidated(true);

      const payload = arrangeFormData();
      // allow to create role with empty permissions
      // there will always be 1 permission by default set in above function
      // if (payload['permissions'].length < 2) {
      //   toast.error('Select atleast one permission');
      //   return;
      // }
      setIsLoading(true);
      try {
        await axiosInstance.put(`/roles/${id}`, payload);
        setIsLoading(false);

        window.localStorage.setItem(
          'sessionmessage',
          JSON.stringify({ message: 'Role updated successfully!', type: 'success' }),
        );
        history.push('/roles-and-permissions');
      } catch (error) {
        if (error.response.status == 422) {
          // setValidated(false);
          setServerErrors(error?.response?.data?.message);
        } else {
          toast.error(error.response.data.message);
        }
        setIsLoading(false);
      }
    } else {
      if (formData.name === '') {
        setErrors('Role is required');
      }
    }
  };

  const combineString = (value: string) => {
    return value.split(' ').join('_');
  };

  return (
    <Layout>
      <ToastContainer />
      <ContentHeader
        title={id ? `Roles and Permissions / ${formData.name} / Edit` : 'Roles and Permissions / Add'}
        needCreateBtn={false}
        createUrl=""
      />
      <ComponentLayout>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <Form onSubmit={(event) => (id ? handleRoleUpdate(event) : handleRoleSubmit(event))}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <Form.Group className="mb-3" controlId="roleId">
                        <Form.Label className="role-name require">Role Name</Form.Label>
                        <Form.Control
                          onChange={handleInputChange}
                          type="text"
                          name="name"
                          value={formData.name}
                          placeholder="Enter role name"
                          isInvalid={Helper.isColError('name', serverErrors) || errors}
                        />
                        <Form.Control.Feedback type="invalid">
                          {Helper.getErrorMsg('name', serverErrors)}
                        </Form.Control.Feedback>
                        <p className="invalid-feedback d-block">{errors}</p>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12">
                      <Form.Group controlId="topSelectAll">
                        <Form.Check
                          name="topSelectAll"
                          onChange={handleSelectAll}
                          checked={
                            Object.keys(checkRoleData).filter((item) => checkRoleData[item].isChecked !== true).length <
                            1
                          }
                          type="checkbox"
                          label="Select All"
                        />
                      </Form.Group>
                    </div>
                  </div>
                  {CmsConfig?.modules.map((module, index) => {
                    return (
                      module.name !== 'Dashboard' && (
                        <div key={index} className="mt-3">
                          <h4 className="roles-heading">{module.name}</h4>
                          <div className="row mt-3">
                            <div className="col-12">
                              <Form.Group className="mb-3" controlId={`groupSelectAll_${combineString(module.name)}`}>
                                <Form.Check
                                  name={combineString(module.name)}
                                  onChange={handleGroupSelectAll}
                                  checked={
                                    Object.keys(checkRoleData).filter((item) => {
                                      if (item.includes(combineString(module.name))) {
                                        return checkRoleData[item].isChecked !== true;
                                      }
                                    }).length < 1
                                  }
                                  type="checkbox"
                                  label="Select All"
                                />
                              </Form.Group>
                            </div>
                          </div>
                          {module.hasSubmodules
                            ? module.subModules &&
                              module.subModules.map((subModule, index) => {
                                return (
                                  <div key={index}>
                                    <h6 className="text-bold role-sub-heading">{subModule.name}</h6>
                                    {subModule.permissions &&
                                      subModule.permissions.map((permission, index) => {
                                        return (
                                          <div key={index}>
                                            <Form.Group
                                              className="mb-3"
                                              controlId={`${subModule.name}-${permission.name}-${index}`}
                                            >
                                              <Form.Check
                                                name={`${combineString(module.name)}_${combineString(
                                                  subModule.name,
                                                )}_${combineString(permission.name)}_${index}`}
                                                onChange={handleCheckInputChange}
                                                value={JSON.stringify(permission)}
                                                type="checkbox"
                                                label={`${permission.name}`}
                                                checked={
                                                  checkRoleData[
                                                    `${combineString(module.name)}_${combineString(
                                                      subModule.name,
                                                    )}_${combineString(permission.name)}_${index}`
                                                  ]?.isChecked || false
                                                }
                                              />
                                            </Form.Group>
                                          </div>
                                        );
                                      })}
                                  </div>
                                );
                              })
                            : module.permissions &&
                              module.permissions.map((permission, index) => {
                                return (
                                  <div key={index}>
                                    <Form.Group
                                      className="mb-3"
                                      controlId={`${module.name}-${permission.name}-${index}`}
                                    >
                                      <Form.Check
                                        name={`${combineString(module.name)}_${combineString(
                                          permission.name,
                                        )}_${index}`}
                                        onChange={handleCheckInputChange}
                                        value={JSON.stringify(permission)}
                                        type="checkbox"
                                        label={`${permission.name}`}
                                        checked={
                                          checkRoleData[
                                            `${combineString(module.name)}_${combineString(permission.name)}_${index}`
                                          ]?.isChecked || false
                                        }
                                      />
                                    </Form.Group>
                                  </div>
                                );
                              })}
                        </div>
                      )
                    );
                  })}
                </div>
                <div className="card-footer">
                  <Button type="submit" className="btn btn-primary">
                    {id ? 'Update' : 'Create'} <Loader isLoading={isLoading} />
                  </Button>
                  <Link to="/roles-and-permissions" className="ml-2 btn btn-danger">
                    Cancel
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </ComponentLayout>
    </Layout>
  );
}

export default CreateRole;
