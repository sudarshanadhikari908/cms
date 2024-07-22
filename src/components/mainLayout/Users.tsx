import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import { setUserList } from '../../redux/actions/userAction';
import axiosInstance from '../../axios/axios';
import Layout from '../../pages/Layout';
import ComponentLayout from '../common/ComponentLayout';
import CommonModal from '../common/modals/Modal';
import { selectProfile } from '../../redux/selectors/profileSelectors/profileSelectors';
import ContentHeader from '../common/ContentHeader';
import { selectFilteredList } from '../../redux/selectors/userSelectors/usersSelectors';
import Pagination from '../common/Pagination';
import ItemsPerPage from '../common/ItemsPerPage';
import SessionToastMessage from '../../utils/sessionToastMessage';
import Loader from '../common/Loader';
import { checkPermissions } from '../../utils/checkPermissions';

function Users() {
  const profile = useSelector(selectProfile);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const [roleId, setRoleId] = useState();
  const [term, setTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(-1);
  const [totalItems, setTotalItems] = useState<number>(5);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const users = useSelector(selectFilteredList);
  const dispatch = useDispatch();

  const handleModalToggle = () => {
    setModalToggle(!modalToggle);
  };

  // Search filter setter
  const changeHandler = (e: any) => {
    setTerm(e.target.value);
  };

  const handleClick = () => {
    setCurrentPage(1);
    setSearchTerm(term);
  };

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      let apiUrl = `/users?keywords=${searchTerm.trim()}&limit=${pageSize}&page=${currentPage}`;
      if (roleId != undefined) {
        apiUrl += `&roleId=${roleId}`;
      }
      const res = await axiosInstance.get(apiUrl);
      if (res.status === 200) {
        dispatch(setUserList(res.data.results));
        setTotalItems(res.data.totalItems);
        setCurrentPage(res.data.currentPage);
        setPageSize(res.data.pageSize);
      }
      setIsLoading(false);
    } catch (e: any) {
      setIsLoading(false);
      toast.error(e.response.data.message);
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await axiosInstance.delete(`/users/${userId}`);
      setModalToggle(false);
      await fetchUser();
      toast.success('User deleted successfully!');
    } catch (e: any) {
      const message = e.response.data.message;
      toast.error(message);
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await axiosInstance.get('/roles?limit=100&page=1');
      if (res && res.data && res.data.results) {
        setRoles(res.data.results);
      }
    };
    fetchRoles();

    SessionToastMessage.showSessionMessage();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [searchTerm, pageSize, currentPage, roleId]);

  return (
    <>
      <Layout>
        <ToastContainer />
        <ContentHeader
          title="Users"
          needCreateBtn={checkPermissions(profile, '/users', 'post') && true}
          createUrl="/users/create"
        />
        <CommonModal
          modalToggle={modalToggle}
          handleItemDelete={() => deleteUser(selectedUserId)}
          handleModalToggle={handleModalToggle}
          resetUserId={setSelectedUserId}
        >
          <h5 className="lead">
            Are you sure you would like to <b>Delete?</b>
          </h5>
        </CommonModal>
        <ComponentLayout>
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center justify-content-between flex-wrap">
                    <div className=" col-xl-2 col-lg-3 col-md-4">
                      <div className="form-group mb-0 select-custom">
                        <select
                          name="roleId"
                          className="search-form-control form-control"
                          onChange={(e: any) => setRoleId(e.target.value)}
                        >
                          <option value="">Select Role</option>
                          {roles.map((role: any, key: number) => {
                            return (
                              <option key={key} value={role.id}>
                                {role.name}
                              </option>
                            );
                          })}
                        </select>
                        <i className="fas fa-angle-down"></i>
                      </div>
                    </div>
                    <div className="col-xl-8 col-lg-6 col-md-7">
                      <input
                        type="text"
                        name="table_search"
                        className="search-form-control form-control float-right"
                        placeholder="Search User"
                        onChange={changeHandler}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleClick();
                          }
                        }}
                      />
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-1 pl-0">
                      <button type="submit" className="user-search btn btn-primary" onClick={handleClick}>
                        <i className="fas fa-search mr-2"></i> <span>Search</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="system-table table text-nowrap">
                          <thead>
                            <tr>
                              <th className="sn-th">S.N.</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Role</th>
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
                                {users.length == 0 ? (
                                  <tr>
                                    <td colSpan={6} className="text-center">
                                      No users found
                                    </td>
                                  </tr>
                                ) : (
                                  <>
                                    {users.map((user: any, key: number) => {
                                      return (
                                        <tr key={key}>
                                          <td>{(currentPage - 1) * pageSize + (key + 1)}.</td>
                                          <td>
                                            {user.firstName} {user.lastName}
                                          </td>
                                          <td>{user.email}</td>
                                          <td>{user.contact ? user.contact : '-'}</td>
                                          <td>{user.role.name}</td>
                                          <td>
                                            <div className="td-ios">
                                              {profile && profile?.id == user.id ? (
                                                <>---</>
                                              ) : (
                                                <>
                                                  {checkPermissions(profile, '/users/:id', 'put') ? (
                                                    <Link
                                                      to={`users/${user.id}/edit`}
                                                      // type="button"
                                                      className="btn  mr-2 btn-info btn-ios"
                                                    >
                                                      <i className="fas fa-edit pr-2"></i>Edit
                                                    </Link>
                                                  ) : (
                                                    <>&nbsp;</>
                                                  )}
                                                  {checkPermissions(profile, '/users/:id', 'delete') ? (
                                                    <button
                                                      onClick={() => {
                                                        handleModalToggle();
                                                        setSelectedUserId(user.id);
                                                      }}
                                                      type="button"
                                                      className={`${
                                                        user.id == 1 ? 'd-none' : ''
                                                      } btn pt-2 pb-2 pr-5 pl-5 btn-danger`}
                                                    >
                                                      <i className="fas fa-trash pr-2"></i>Delete
                                                    </button>
                                                  ) : (
                                                    <>&nbsp;</>
                                                  )}
                                                </>
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
            </div>
          </div>
        </ComponentLayout>
      </Layout>
    </>
  );
}

export default Users;
