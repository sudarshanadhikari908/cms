import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../../pages/Layout';
import { getCustomers } from '../../redux/actions/customerAction';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import ComponentLayout from '../common/ComponentLayout';
import ContentHeader from '../common/ContentHeader';
import ItemsPerPage from '../common/ItemsPerPage';
import Loader from '../common/Loader';
import PaginationComponent from '../common/Pagination';
import { checkPermissions } from '../../utils/checkPermissions';

function Customers() {
  const [term, setTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { profile } = useAppSelector((state) => state.profile);

  const dispatch = useAppDispatch();
  const { customerList, customerLoading } = useAppSelector((state) => state.customerReducer);

  const changeHandler = (e: any) => {
    setTerm(e.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setSearchTerm(term);
  };

  useEffect(() => {
    dispatch(getCustomers({ searchTerm, currentPage, pageSize }));
  }, [searchTerm, currentPage, pageSize]);

  return (
    <Layout>
      <ContentHeader
        title="Customers"
        needCreateBtn={false}
        createUrl=""
        exportButton={checkPermissions(profile, '/customers/export', 'get') && true}
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
                  placeholder="Search Customer"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  onChange={changeHandler}
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
                  <th>Public Address</th>
                  <th>Email</th>
                  <th className="text-center">Twitch</th>
                  <th className="text-center">Discord</th>
                  <th className="text-center">Twitter</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customerLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center">
                      <Loader isLoading={customerLoading} />
                    </td>
                  </tr>
                ) : (
                  <>
                    {customerList && customerList.results && customerList.results.length == 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center">
                          No customers found
                        </td>
                      </tr>
                    ) : (
                      <>
                        {customerList &&
                          customerList.results &&
                          customerList.results.map((customer: any, index: number) => {
                            return (
                              <tr key={index}>
                                <td>{(customerList.currentPage - 1) * customerList.pageSize + (index + 1)}.</td>
                                <td>{customer.address}</td>
                                <td>{customer.email ? customer.email : '-'}</td>
                                <td className="text-center">
                                  {customer?.social_links?.twitch ? (
                                    <i className="far fa-check-circle social-icon"></i>
                                  ) : (
                                    '-'
                                  )}
                                </td>
                                <td className="text-center">
                                  {customer?.social_links?.discord ? (
                                    <i className="far fa-check-circle social-icon"></i>
                                  ) : (
                                    '-'
                                  )}
                                </td>
                                <td className="text-center">
                                  {customer?.social_links?.twitter ? (
                                    <i className="far fa-check-circle social-icon"></i>
                                  ) : (
                                    '-'
                                  )}
                                </td>
                                <td>
                                  <Link
                                    to={`/customers/${customer.id}/view`}
                                    className="btn py-2 px-5 mr-2 btn-success"
                                  >
                                    <i className="fas fa-eye pr-2"></i> View
                                  </Link>
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
            {customerList && (
              <div className="footer-wrapper">
                <PaginationComponent
                  itemsCount={customerList?.totalItems}
                  itemsPerPage={customerList?.pageSize}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  alwaysShown={true}
                />
                <ItemsPerPage
                  itemsPerPage={customerList?.pageSize}
                  setItemsPerPage={setPageSize}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </Card.Footer>
        </Card>
      </ComponentLayout>
    </Layout>
  );
}

export default Customers;
