import { useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ethers } from 'ethers';

import ComponentLayout from '../../components/common/ComponentLayout';
import ContentHeader from '../../components/common/ContentHeader';
import Loader from '../../components/common/Loader';
import { getAuctionById } from '../../redux/actions/auctionAction';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import Layout from '../Layout';

function ViewAuction() {
  interface Params {
    id?: string;
  }

  const { id } = useParams<Params>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAuctionById({ id }));
  }, [dispatch, id]);

  const { auction, auctionLoading } = useAppSelector((state) => state.auction);

  return (
    <>
      <Layout>
        <ContentHeader title="Auction Management / View Auction" needCreateBtn={false} createUrl="" />
        <ComponentLayout>
          <Card>
            <Card.Body>
              {auctionLoading ? (
                <Loader isLoading={auctionLoading} />
              ) : (
                <>
                  {auction && (
                    <Table responsive className="system-table text-nowrap">
                      <tbody>
                        <tr>
                          <th className="th-acc">Auction Name</th>
                          <td>{auction?.name}</td>
                        </tr>
                        <tr>
                          <th className="th-acc">Status</th>
                          <td>
                            {auction?.status === 'active'
                              ? 'Active'
                              : auction?.status === 'inactive'
                              ? 'Inactive'
                              : auction?.status === 'closed'
                              ? 'Closed'
                              : 'Pending'}
                          </td>
                        </tr>
                        {/* <tr>
                          <th className="th-acc">Date</th>
                          <td>-</td>
                        </tr>
                        <tr>
                          <th className="th-acc">Start Block Time</th>
                          <td>{auction?.startTime}</td>
                        </tr> */}
                        <tr>
                          <th className="th-acc">Auction Length</th>
                          <td>{auction?.length} hrs</td>
                        </tr>
                        <tr>
                          <th className="th-acc">Start Time (Approx.)</th>
                          <td>{moment(Number(auction?.startBlockTime)).format('YYYY-MM-DD hh:mm a').toString()}</td>
                        </tr>
                        <tr>
                          <th className="th-acc">Base Price</th>
                          <td>{auction?.floorPrice} ETH</td>
                        </tr>
                        <tr>
                          <th className="th-acc">Final Price</th>
                          <td>
                            {auction && auction.status !== 'inactive'
                              ? auction.totalBidsPlaced > auction.totalSupply
                                ? `${auction.finalPrice} ETH`
                                : `${auction.floorPrice} ETH`
                              : '-'}
                          </td>
                        </tr>
                        <tr>
                          <th className="th-acc">Total Bids Placed</th>
                          <td>{auction?.totalBidsPlaced}</td>
                        </tr>
                      </tbody>
                    </Table>
                  )}
                </>
              )}
            </Card.Body>
            <Card.Footer>
              <Link to="/auctions" className="btn btn-danger">
                Back
              </Link>
            </Card.Footer>
          </Card>
        </ComponentLayout>
      </Layout>
    </>
  );
}

export default ViewAuction;
