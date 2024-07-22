import React, { useEffect, useState } from 'react';
import { Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import ComponentLayout from '../../components/common/ComponentLayout';
import ContentHeader from '../../components/common/ContentHeader';
import Layout from '../Layout';
import Avatar from '../../assets/images/default-user.jpg';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { getCustomerById } from '../../redux/actions/customerAction';
import { useParams } from 'react-router';
import moment from 'moment';
import Loader from '../../components/common/Loader';

function ViewCustomer() {
  interface Params {
    id?: string;
  }

  const dispatch = useAppDispatch();
  const { id } = useParams<Params>();

  const { customerData, customerLoading } = useAppSelector((state) => state.customerReducer);

  useEffect(() => {
    dispatch(getCustomerById({ id }));
  }, [id]);

  const getReferredByText = (customer: any) => {
    let referredBy = '-';
    if (customer?.referred_by) {
      referredBy = customer?.referred_by;
      if (customer?.referring_url) {
        referredBy = referredBy + ' (' + customer?.referring_url + ')';
      }
    }
    return referredBy;
  };

  return (
    <Layout>
      <ContentHeader title="Customers/ Customer Profile" needCreateBtn={false} createUrl="" />
      <ComponentLayout>
        <div className="customer">
          {customerLoading ? (
            <Loader isLoading={customerLoading} />
          ) : (
            <>
              <Row>
                <Col xl={3} md={4}>
                  <Card className="h-100">
                    <Card.Body>
                      <div className="customer-profile">
                        <div className="customer-profile_img mb-2">
                          <Image src={Avatar} alt="Customer Image" className="img-fluid" />
                        </div>
                        <p className="customer-profile_address">{customerData?.address}</p>
                      </div>
                      <div className="customer-info">
                        <div className="mb-3">
                          <h6>Date Joined</h6>
                          <p>{moment(customerData?.createdAt).format('MMMM DD, YYYY')}</p>
                        </div>
                        <div className="mb-3">
                          <h6>Referred by</h6>
                          <p>{getReferredByText(customerData)}</p>
                        </div>
                        <div>
                          <h6>Status</h6>
                          <p>Active</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xl={9} md={8}>
                  <Card className="customer-detail mb-0">
                    <Card.Body>
                      <h4 className="mb-3 font-weight-bold">Details</h4>
                      <Row>
                        <Col xl={5} md={12} className="mb-xl-0 mb-4">
                          <div className="detail-block h-100">
                            <h5 className='font-weight-bold'>Social Connections</h5>
                            <div className="customer-info detail-block_inner">
                              <div className="mb-4">
                                <h6>Twitter</h6>
                                <p>{customerData?.social_links?.twitter ? customerData?.social_links?.twitter : '-'}</p>
                              </div>
                              <div className="mb-4">
                                <h6>Twitch</h6>
                                <p>{customerData?.social_links?.twitch ? customerData?.social_links?.twitch : '-'}</p>
                              </div>
                              <div className="mb-4">
                                <h6>Discord</h6>
                                <p>{customerData?.social_links?.discord ? customerData?.social_links?.discord : '-'}</p>
                              </div>
                              <div>
                                <h6>Email</h6>
                                <p>{customerData?.email ? customerData?.email : '-'}</p>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xl={7} md={12}>
                          <div className="detail-block mb-4">
                            <h5 className='font-weight-bold'>Connection Rewards</h5>
                            <div className="detail-block_inner pl-3">
                              <Form.Check
                                type="checkbox"
                                label="Connect Metamask"
                                checked={customerData?.address ? true : false}
                                readOnly
                              />
                              <Form.Check
                                type="checkbox"
                                label="Connect All Social Accounts"
                                checked={
                                  customerData?.social_links?.twitter &&
                                  customerData?.social_links?.twitch &&
                                  customerData?.social_links?.discord &&
                                  customerData?.email
                                    ? true
                                    : false
                                }
                              />
                              <Form.Check
                                type="checkbox"
                                label="Recruit 1 Friend"
                                checked={customerData && customerData?.referred_users?.length > 0 ? true : false}
                              />
                              <Form.Check
                                type="checkbox"
                                label="Recruit 5 Friends"
                                checked={customerData && customerData?.referred_users?.length >= 5 ? true : false}
                              />
                            </div>
                          </div>
                          <div className="detail-block">
                            <h5 className='font-weight-bold'>Referred Customers ({customerData && customerData?.referred_users.length})</h5>
                            <div className="detail-block_inner">
                              <ListGroup variant="flush">
                                {customerData && customerData?.referred_users.length > 0 ? (
                                  customerData.referred_users.map((referrer: string) => (
                                    <>
                                      <ListGroup.Item>{referrer}</ListGroup.Item>
                                    </>
                                  ))
                                ) : (
                                  <>
                                    <ListGroup.Item>No referred users yet</ListGroup.Item>
                                  </>
                                )}
                              </ListGroup>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
        </div>
      </ComponentLayout>
    </Layout>
  );
}

export default ViewCustomer;
