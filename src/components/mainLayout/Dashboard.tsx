import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import Layout from '../../pages/Layout';
import Loader from '../common/Loader';
import { getDashBoard } from '../../redux/actions/dashBoardAction';
import ContentHeader from '../common/ContentHeader';
import ComponentLayout from '../common/ComponentLayout';

function Dashboard() {
  const dispatch = useAppDispatch();
  const { dashBoardData, dashBoardLoading } = useAppSelector((state) => state.dashBoardReducer);
  if (!window.localStorage.getItem('isLoggedIn') || window.localStorage.getItem('isLoggedIn') !== 'true') {
    <Redirect to="/login" />;
  }
  useEffect(() => {
    dispatch(getDashBoard());
  }, []);
  return (
    <Layout>
      <ContentHeader title="Dashboard" needCreateBtn={false} createUrl="" />
      <ComponentLayout>
        {dashBoardLoading ? (
          <Loader isLoading={dashBoardLoading} />
        ) : (
          <div className="row">
            <div className="col-lg-6">
              <div className="dashboard-card">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold">Customer Count</h5>
                    <div className="card-container">
                      <div className="card-item">
                        <p className="card-text card-number" id="customer-count-total">
                          {dashBoardData && dashBoardData.customerCount}
                        </p>
                        <p className="card-text">&nbsp;</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="dashboard-card">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold">Total NFTs Minted</h5>

                    <div className="card-container">
                      <div className="card-item">
                        <p className="card-text card-number" id="auction-nft-count">
                          {dashBoardData && dashBoardData.auctionNfts}
                        </p>
                        <p className="card-text">Auction NFTs</p>
                      </div>
                      <div className="card-item">
                        <p className="card-text card-number" id="free-nfts-count">
                          {dashBoardData && dashBoardData.freeNfts}
                        </p>
                        <p className="card-text">Free NFTs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="dashboard-card">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title font-weight-bold">Social Connections Total</h5>
                    <div className="card-container">
                      <div className="card-item">
                        <p className="card-text card-number" id="discord-count">
                          {dashBoardData && dashBoardData.discord}
                        </p>
                        <p className="card-text">Discord</p>
                      </div>
                      <div className="card-item">
                        <p className="card-text card-number" id="email-count">
                          {dashBoardData && dashBoardData.email}
                        </p>
                        <p className="card-text">Email</p>
                      </div>
                      <div className="card-item">
                        <p className="card-text card-number" id="twitch-count">
                          {dashBoardData && dashBoardData.twitch}
                        </p>
                        <p className="card-text">Twitch</p>
                      </div>
                      <div className="card-item">
                        <p className="card-text card-number" id="twitter-count">
                          {dashBoardData && dashBoardData.twitter}
                        </p>
                        <p className="card-text">Twitter</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ComponentLayout>
    </Layout>
  );
}
export default Dashboard;
