import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import axiosInstance from '../../axios/axios';
import Layout from '../../pages/Layout';
import ComponentLayout from '../common/ComponentLayout';
import CommonModal from '../common/modals/Modal';
import ContentHeader from '../common/ContentHeader';
import { useAppSelector } from '../../redux/reduxHooks';
import { RolesInterface } from '../../interface/roles/roles.interface';
import Pagination from '../common/Pagination';
import ItemsPerPage from '../common/ItemsPerPage';
import SessionToastMessage from '../../utils/sessionToastMessage';
import Loader from '../common/Loader';
import { checkPermissions } from '../../utils/checkPermissions';

function Roles() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalToggle, setModalToggle] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(-1);
  const [roles, setRoles] = useState<RolesInterface>();
  const [searchKeyword, setSearchKeyword] = useState({
    keyword: '',
  });

  const [totalItems, setTotalItems] = useState<number>(5);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { profile } = useAppSelector((state) => state.profile);

  const handleModalToggle = () => {
    setModalToggle(!modalToggle);
  };

  const deleteRole = async (roleId: number) => {
    try {
      await axiosInstance.delete(`/roles/${roleId}`);
      window.localStorage.setItem(
        'sessionmessage',
        JSON.stringify({ message: 'Role deleted successfully!', type: 'success' }),
      );
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setModalToggle(!modalToggle);
  };

  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true);
      const res = await axiosInstance.get(`/roles?limit=${pageSize}&page=${currentPage}`);
      if (res && res.status === 200) {
        setRoles(res.data);
        setTotalItems(res.data.totalItems);
        setCurrentPage(res.data.currentPage);
        setPageSize(res.data.pageSize);
      }
      setIsLoading(false);
    };

    fetchRoles();

    SessionToastMessage.showSessionMessage();
  }, [pageSize, currentPage]);

  return (
    <Layout>
      <ToastContainer />
      <ContentHeader
        title="Roles"
        needCreateBtn={checkPermissions(profile, '/roles', 'post') && true}
        createUrl="/roles-and-permissions/create"
      />
      <CommonModal
        modalToggle={modalToggle}
        handleItemDelete={() => deleteRole(selectedRoleId)}
        handleModalToggle={handleModalToggle}
        resetUserId={setSelectedRoleId}
      >
        <h5 className="lead">
          Are you sure you would like to <b>Delete</b> this role?
        </h5>
      </CommonModal>
      <ComponentLayout>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="system-table table text-nowrap user-table">
                    <thead>
                      <tr>
                        <th>S.N.</th>
                        <th>Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan={6} className="text-center">
                            <Loader isLoading={isLoading} />
                          </td>
                        </tr>
                      ) : (
                        <>
                          {roles && roles.results && roles.results.length == 0 ? (
                            <tr>
                              <td colSpan={3} className="text-center">
                                No roles found
                              </td>
                            </tr>
                          ) : (
                            <>
                              {roles &&
                                roles.results &&
                                roles.results.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className="user-td">{(currentPage - 1) * pageSize + (index + 1)}.</td>
                                      <td>{item.name}</td>
                                      <td>
                                        <div className="td-ios">
                                          {checkPermissions(profile, '/roles/:id', 'get') ? (
                                            <Link
                                              to={`/roles-and-permissions/${item.id}/view`}
                                              // type="button"
                                              className="btn mr-2 btn-success btn-ios"
                                            >
                                              <i className="far fa-eye pr-2"></i>View
                                            </Link>
                                          ) : (
                                            <>&nbsp;</>
                                          )}
                                          {checkPermissions(profile, '/roles/:id', 'put') ? (
                                            <Link
                                              to={`/roles-and-permissions/${item.id}/edit`}
                                              // type="button"
                                              className="btn mr-2 btn-info btn-ios"
                                            >
                                              <i className="far fas fa-edit pr-2"></i>Edit
                                            </Link>
                                          ) : (
                                            <>&nbsp;</>
                                          )}
                                          {checkPermissions(profile, '/roles/:id', 'delete') ? (
                                            <button
                                              onClick={() => {
                                                handleModalToggle();
                                                setSelectedRoleId(item.id);
                                              }}
                                              type="button"
                                              className={`${
                                                item.name === 'Super Admin' ? 'd-none' : ''
                                              } btn pt-2 pb-2 pr-5 pl-5 btn-danger`}
                                            >
                                              <i className="fas fa-trash pr-2"></i>Delete
                                            </button>
                                          ) : (
                                            <>&nbsp;</>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer clearfix">
                {/* Pagination goes here */}
                <div className="row">
                  <div className="col-12 footer-wrapper">
                    <Pagination
                      itemsCount={totalItems}
                      itemsPerPage={pageSize}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      alwaysShown={true}
                    />
                    <ItemsPerPage
                      itemsPerPage={pageSize}
                      setItemsPerPage={setPageSize}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComponentLayout>
    </Layout>
  );
}

export default Roles;
