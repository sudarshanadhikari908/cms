import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../../axios/axios';
import Layout from '../../pages/Layout';
import { getEmailTemplates } from '../../redux/actions/emailTemplateAction';
import { useAppSelector } from '../../redux/reduxHooks';
import { checkPermissions } from '../../utils/checkPermissions';
import ComponentLayout from '../common/ComponentLayout';
import ContentHeader from '../common/ContentHeader';
import ItemsPerPage from '../common/ItemsPerPage';
import Loader from '../common/Loader';
import CommonModal from '../common/modals/Modal';
import PaginationComponent from '../common/Pagination';

function EmailTemplate() {
  const { profile } = useAppSelector((state) => state.profile);
  const [term, setTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [modalToggle, setModalToggle] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmailTemplates({ searchTerm, currentPage, pageSize }));
  }, [searchTerm, currentPage, pageSize]);

  const { emailTemplateList, emailLoading } = useAppSelector((state) => state.emailReducer);
  const changeHandler = (e: any) => {
    setTerm(e.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchTerm(term);
  };

  const handleModalToggle = () => {
    setModalToggle(!modalToggle);
  };

  const deleteEmail = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`/email-templates/${id}`);
      if (response.status === 200) {
        setModalToggle(false);
        dispatch(getEmailTemplates({}));
        toast.success('User deleted successfully!');
      }
    } catch (e: any) {
      const message = e.response.data.message;
      toast.error(message);
    }
  };

  return (
    <>
      <Layout>
        <ToastContainer />
        <CommonModal
          modalToggle={modalToggle}
          handleItemDelete={() => deleteEmail(selectedId)}
          handleModalToggle={handleModalToggle}
          resetUserId={setSelectedId}
        >
          <h5 className="lead">
            Are you sure you would like to <b>Delete?</b>
          </h5>
        </CommonModal>
        <ContentHeader
          title="Email Templates"
          needCreateBtn={checkPermissions(profile, '/email-template', 'post') && true}
          createUrl="auctions/create"
        />
        <ComponentLayout>
          <Card>
            <Card.Body>
              <Row>
                <Col sm={10}>
                  <Form.Control
                    value={term}
                    type="text"
                    name="table_Search"
                    className="search-form-control float-right"
                    onChange={changeHandler}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                    placeholder="Search Email Template"
                  />
                </Col>
                <Col sm={2} className="pl-0">
                  <Button variant="primary" type="submit" className="user-search" onClick={handleSearch}>
                    <i className="fas fa-search mr-2"></i>
                    <span>Search</span>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Table responsive className="system-table text-nowrap">
                <thead>
                  <tr>
                    <th className="sn-th">S.N.</th>
                    <th>Title</th>
                    <th>Subject</th>
                    <th>Target</th>
                    <th>Code</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {emailLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center">
                        <Loader isLoading={emailLoading} />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {emailTemplateList && emailTemplateList.results && emailTemplateList.results.length == 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center">
                            No email templates found
                          </td>
                        </tr>
                      ) : (
                        <>
                          {emailTemplateList &&
                            emailTemplateList.results &&
                            emailTemplateList.results.map((data: any, key: number) => {
                              return (
                                <tr key={key}>
                                  <td>
                                    {(emailTemplateList.currentPage - 1) * emailTemplateList?.pageSize + (key + 1)}.
                                  </td>
                                  <td>{data.title}</td>
                                  <td>{data.subject}</td>
                                  <td>{data.target}</td>
                                  <td>{data.code}</td>
                                  <td>
                                    {checkPermissions(profile, '/email-templates/:id', 'put') ? (
                                      <Link
                                        to={`/email-templates/${data.id}/edit`}
                                        className="btn pt-2 pb-2 pr-5 pl-5 mr-2 btn-success"
                                      >
                                        <i className="fas fa-edit pr-2"></i>Edit
                                      </Link>
                                    ) : (
                                      <>&nbsp;</>
                                    )}
                                    {checkPermissions(profile, '/email-templates/:id', 'delete') ? (
                                      <button
                                        type="button"
                                        className={`${data.id == 1 ? 'd-none' : ''} btn pt-2 pb-2 pr-5 pl-5 btn-danger`}
                                        onClick={() => {
                                          handleModalToggle();
                                          setSelectedId(data.id);
                                        }}
                                      >
                                        <i className="fas fa-trash pr-2"></i>Delete
                                      </button>
                                    ) : (
                                      <>&nbsp;</>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </>
                      )}
                    </>
                  )}
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer className="clearfix">
              {emailTemplateList && (
                <div className="footer-wrapper">
                  <PaginationComponent
                    itemsCount={emailTemplateList?.totalItems}
                    itemsPerPage={emailTemplateList?.pageSize}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    alwaysShown={true}
                  />
                  <ItemsPerPage
                    itemsPerPage={emailTemplateList?.pageSize}
                    setItemsPerPage={setPageSize}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              )}
            </Card.Footer>
          </Card>
        </ComponentLayout>
      </Layout>
    </>
  );
}

export default EmailTemplate;
