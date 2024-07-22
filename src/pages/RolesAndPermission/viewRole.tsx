import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

import ComponentLayout from '../../components/common/ComponentLayout';
import ContentHeader from '../../components/common/ContentHeader';
import Layout from '../Layout';
import CmsConfig from '../../config/cmsConfig';
import axiosInstance from '../../axios/axios';
import { RolesData, APermissions } from '../../interface/roles/roles.interface';

function ViewRole() {
  const [checkRoleData, setCheckRoleData] = useState<RolesData>({});
  const [rolePermissions, setRolePermissions] = useState<APermissions[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  interface Params {
    id?: string;
  }

  const { id } = useParams<Params>();

  useEffect(() => {
    handleInitialCheck();
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
      console.log(error);
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

  const combineString = (value: string) => {
    return value.split(' ').join('_');
  };

  return (
    <Layout>
      <ContentHeader title={`Roles and Permissions / ${formData.name}`} needCreateBtn={false} createUrl="" />
      <ComponentLayout>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <Form>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <Form.Group className="mb-3" controlId="roleId">
                        <Form.Label className="role-name">Role Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          disabled={true}
                          value={formData.name}
                          placeholder="Enter role name"
                          required
                        />
                        <Form.Control.Feedback type="invalid">Role is required!</Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-12">
                      <Form.Group controlId="topSelectAll">
                        <Form.Check
                          name="topSelectAll"
                          disabled={true}
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
                  <div className="row">
                    <div className="col">
                      {CmsConfig?.modules.map((module, index) => {
                        return (
                          module.name !== 'Dashboard' && (
                            <div key={index} className="my-3">
                              <h4 className="roles-heading">{module.name}</h4>
                              <div className="row mt-3">
                                <div className="col-12">
                                  <Form.Group
                                    className="mb-3"
                                    controlId={`groupSelectAll_${combineString(module.name)}`}
                                  >
                                    <Form.Check
                                      name={combineString(module.name)}
                                      disabled={true}
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
                                                    type="checkbox"
                                                    disabled={true}
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
                                            disabled={true}
                                            value={JSON.stringify(permission)}
                                            type="checkbox"
                                            label={`${permission.name}`}
                                            checked={
                                              checkRoleData[
                                                `${combineString(module.name)}_${combineString(
                                                  permission.name,
                                                )}_${index}`
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
                  </div>
                </div>
                <div className="card-footer">
                  <Link to="/roles-and-permissions" className="btn btn-danger">
                    Back
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

export default ViewRole;
