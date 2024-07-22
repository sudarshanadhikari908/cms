import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ethers } from 'ethers';
import moment from 'moment';

import auctionABI from '../../utils/abi/auction';
import getProvider from '../../utils/getProviders';
import metamask from '../../utils/metamask';
import axiosInstance from '../../axios/axios';
import Layout from '../../pages/Layout';
import { getAuctionData } from '../../redux/actions/auctionAction';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import ComponentLayout from '../common/ComponentLayout';
import ContentHeader from '../common/ContentHeader';
import ItemsPerPage from '../common/ItemsPerPage';
import Loader from '../common/Loader';
import { checkPermissions } from '../../utils/checkPermissions';
import SessionToastMessage from '../../utils/sessionToastMessage';
import ConfirmModal from '../common/modals/ConfirmModal';
import PaginationComponent from '../common/Pagination';

function AuctionManagement() {
  const [term, setTerm] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [provider] = useState((window as any).ethereum);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [auctionAddress, setAuctionAddress] = useState<string>('');
  const [auctionId, setAuctionId] = useState<number>();
  const [startLoader, setStartLoader] = useState<boolean>(false);
  const [openStartModal, setOpenStartModal] = useState<boolean>(false);
  const { auctionList, auctionLoading } = useAppSelector((state) => state.auction);
  const { profile } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getAuctionData({
        currentPage,
        pageSize,
        searchTerm,
        searchStatus,
      }),
    );

    SessionToastMessage.showSessionMessage();
  }, [dispatch, pageSize, currentPage, searchStatus, searchTerm]);

  const closeStartModal = () => {
    setOpenStartModal(false);
    setStartLoader(false);
  };

  // Search filter setter
  const changeHandler = (e: any) => {
    setTerm(e.target.value);
  };
  const handleSearchClick = () => {
    setCurrentPage(1);
    setSearchTerm(term);
  };

  const closeAuction = async (address: string) => {
    if (!metamask.isConnected()) {
      toast.error('Please install and connect metamask before using any features.');
      return;
    }
    setStartLoader(true);
    try {
      const metamaskProvider = await getProvider();
      let provider;
      if (metamaskProvider) {
        provider = new ethers.providers.Web3Provider(metamaskProvider);
      }
      if (provider) {
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const contractAddress = address;
        const contractInstance = new ethers.Contract(contractAddress, auctionABI.abi, provider.getSigner());
        contractInstance.connect(signer);
        await contractInstance.endAuction();
        setStartLoader(false);
        setOpenStartModal(false);
        toast.success('Auction is processing and it will close soon.');
      }
    } catch (error) {
      setOpenStartModal(false);
      setStartLoader(false);
      const errorMessage = error?.error?.message || error?.message;
      toast.error(errorMessage);
    }
  };

  const pauseHandler = async (address: string, pauseStatus: string) => {
    if (!metamask.isConnected()) {
      toast.error('Please install and connect metamask before using any features.');
      return;
    }
    setStartLoader(true);
    try {
      const metamaskProvider = await getProvider();
      let provider;
      if (metamaskProvider) {
        provider = new ethers.providers.Web3Provider(metamaskProvider);
      }
      if (provider) {
        await provider.send('eth_requestAccounts', []);
        setStartLoader(true);
        const signer = provider.getSigner();
        const contractAddress = address;
        const contractInstance = new ethers.Contract(contractAddress, auctionABI.abi, provider.getSigner());
        contractInstance.connect(signer);
        if (pauseStatus === 'pause') {
          await contractInstance.pause();
          setOpenStartModal(false);
          toast.success('Auction has been paused.');
        } else if (pauseStatus === 'unpause') {
          await contractInstance.unpause();
          setOpenStartModal(false);
          toast.success('Auction has been unpaused.');
        }
        setStartLoader(false);
      }
    } catch (error) {
      setStartLoader(false);
      setOpenStartModal(false);
      const errorMessage = error?.error?.message || error?.message;
      toast.error(errorMessage);
    }
  };

  const refundHandler = async (address: string) => {
    if (!metamask.isConnected()) {
      toast.error('Please install and connect metamask before using any features.');
      return;
    }
    setStartLoader(true);
    try {
      const response = await axiosInstance.post(`/auctions/${address}/finalize`);
      const metamaskProvider = await getProvider();
      let provider;
      if (metamaskProvider) {
        provider = new ethers.providers.Web3Provider(metamaskProvider);
      }
      if (provider) {
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        const contractAddress = address;
        const contractInstance = new ethers.Contract(contractAddress, auctionABI.abi, provider.getSigner());
        contractInstance.connect(signer);
        if (response) {
          await contractInstance.finalizeAuction(response?.data?.refundRootHash, response?.data?.winnerRootHash);
          setOpenStartModal(false);
          toast.success('Auction finalization is processing and it will finalize soon.');
        }
        setStartLoader(false);
      }
    } catch (error) {
      setStartLoader(false);
      setOpenStartModal(false);
      const errorMessage = error?.error?.message || error?.message;
      toast.error(errorMessage);
    }
  };

  const startAuction = async (address: string) => {
    if (!metamask.isConnected()) {
      toast.error('Please install and connect metamask before using any features.');
      return;
    }
    setStartLoader(true);
    try {
      const metamaskProvider = await getProvider();
      let provider;
      if (metamaskProvider) {
        provider = new ethers.providers.Web3Provider(metamaskProvider);
      }
      if (provider) {
        await provider.send('eth_requestAccounts', []);
        setStartLoader(true);
        const signer = provider.getSigner();
        const contractAddress = address;
        const contractInstance = new ethers.Contract(contractAddress, auctionABI.abi, provider.getSigner());
        contractInstance.connect(signer);
        await contractInstance.openAuction();

        setOpenStartModal(false);
        toast.success('Auction is processing and it will start soon.');
        dispatch(
          getAuctionData({
            currentPage,
            pageSize,
            searchTerm,
            searchStatus,
          }),
        );
        setStartLoader(false);
      }
    } catch (error) {
      setStartLoader(false);
      setOpenStartModal(false);
      const errorMessage = error?.error?.message || error?.message;
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Layout>
        <ToastContainer />
        <ConfirmModal
          openStartModal={openStartModal}
          closeStartModal={closeStartModal}
          startAction={startAuction}
          pauseAction={pauseHandler}
          closeAction={closeAuction}
          refundAction={refundHandler}
          title={modalTitle}
          description={description}
          auctionAddress={auctionAddress}
          auctionId={auctionId}
          startLoader={startLoader}
        />
        <ContentHeader
          title="Auction Management"
          needCreateBtn={checkPermissions(profile, '/auctions', 'post') && true}
          createUrl="auctions/create"
        />
        <ComponentLayout>
          <Card>
            <Card.Body>
              <Row>
                <Col xl={2} lg={3} md={4}>
                  <Form.Group className="mb-0 select-custom">
                    <select
                      name=""
                      id=""
                      className="search-form-control form-control"
                      onChange={(e: any) => setSearchStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="closed">Closed</option>
                    </select>
                    <i className="fas fa-angle-down"></i>
                  </Form.Group>
                </Col>
                <Col xl={8} lg={6} md={7}>
                  <Form.Control
                    value={term}
                    type="text"
                    name="table_Search"
                    className="search-form-control float-right"
                    onChange={changeHandler}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchClick();
                      }
                    }}
                    placeholder="Search Auction"
                  />
                </Col>
                <Col xl={2} lg={3} md={1} className="pl-0">
                  <Button variant="primary" type="submit" onClick={handleSearchClick} className="user-search">
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
                    <th>Name</th>
                    <th>Base Price</th>
                    <th>Auction Length</th>
                    <th>Start Time (Approx.)</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {auctionLoading ? (
                    <tr>
                      <td colSpan={7} className="text-center">
                        <Loader isLoading={auctionLoading} />
                      </td>
                    </tr>
                  ) : (
                    <>
                      {auctionList && auctionList.results && auctionList.results.length == 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center">
                            No Auctions found
                          </td>
                        </tr>
                      ) : (
                        <>
                          {auctionList &&
                            auctionList.results &&
                            auctionList.results.map((auction: any, key: number) => {
                              return (
                                <tr key={key}>
                                  <td>{(auctionList.currentPage - 1) * auctionList.pageSize + (key + 1)}.</td>
                                  <td>{auction.name}</td>
                                  <td>
                                    {auction.floorPrice.toLocaleString('en-US', {
                                      maximumFractionDigits: 16,
                                      minimumFractionDigits: 0,
                                    })}{' '}
                                    Eth
                                  </td>
                                  <td>{auction.length} hrs</td>
                                  <td>
                                    {moment(Number(auction?.startBlockTime)).format('YYYY-MM-DD hh:mm a').toString()}
                                  </td>
                                  <td className="text-capitalize">{auction.status}</td>
                                  <td className="w-25">
                                    {checkPermissions(profile, '/auctions/:id/start', 'post') &&
                                    auction.status == 'inactive' ? (
                                      <Button
                                        className="btn py-2 px-5 mr-2 btn-orange"
                                        onClick={() => {
                                          setDescription('start');
                                          setModalTitle('Start Auction Confirmation.');
                                          setOpenStartModal(true);
                                          setAuctionAddress(auction.address);
                                          setAuctionId(auction.id);
                                        }}
                                      >
                                        <i className="fas fa-play mr-2"></i>Start
                                      </Button>
                                    ) : (
                                      <>&nbsp;</>
                                    )}
                                    {checkPermissions(profile, '/auctions/:id', 'get') ? (
                                      <Link
                                        to={`/auctions/${auction.id}/view`}
                                        className="btn py-2 px-5 mr-2 btn-success"
                                      >
                                        <i className="fas fa-eye pr-2"></i>View
                                      </Link>
                                    ) : (
                                      <>&nbsp;</>
                                    )}

                                    {auction?.paused === false
                                      ? (auction?.status === 'active' || auction?.status === 'closed') &&
                                        checkPermissions(profile, '/auctions/:id/pause', 'post') && (
                                          <>
                                            <Button
                                              className="btn py-2 px-5 mr-2 btn-orange"
                                              onClick={() => {
                                                setDescription('pause');
                                                setModalTitle('Pause Auction Confirmation');
                                                setAuctionAddress(auction.address);
                                                setOpenStartModal(true);
                                              }}
                                            >
                                              <i className="fas fa-pause mr-2"></i>Pause
                                            </Button>
                                          </>
                                        )
                                      : (auction.status === 'active' || auction.status === 'closed') &&
                                        checkPermissions(profile, '/auctions/:id/pause', 'post') && (
                                          <>
                                            <Button
                                              className="btn py-2 px-5 mr-2 btn-orange"
                                              onClick={() => {
                                                setDescription('unpause');
                                                setModalTitle('Pause Auction Confirmation');
                                                setAuctionAddress(auction.address);
                                                setOpenStartModal(true);
                                              }}
                                            >
                                              <i className="fas fa-play mr-2"></i>Unpause
                                            </Button>
                                          </>
                                        )}
                                    {checkPermissions(profile, '/auctions/:id', 'put') &&
                                    auction.status == 'inactive' ? (
                                      <Link to={`/auctions/${auction.id}/edit`} className="btn py-2 px-5 btn-info">
                                        <i className="fas fa-edit pr-2"></i>Edit
                                      </Link>
                                    ) : (
                                      <>&nbsp;</>
                                    )}

                                    {checkPermissions(profile, '/auctions/:id/close', 'post') &&
                                    Number(auction.startBlockTime) + auction.length * 60 * 60 * 1000 < Date.now() &&
                                    auction.status === 'active' ? (
                                      <>
                                        <Button
                                          className="btn py-2 px-5 mr-2 btn-orange"
                                          onClick={() => {
                                            setDescription('close');
                                            setModalTitle('Close Auction Confirmation');
                                            setAuctionAddress(auction.address);
                                            setOpenStartModal(true);
                                          }}
                                        >
                                          <i className="fas fa-stop mr-2"></i>Close
                                        </Button>
                                      </>
                                    ) : (
                                      <>&nbsp;</>
                                    )}
                                    {auction.status === 'closed' &&
                                    !auction.winnerMerkleRootSet &&
                                    !auction.refundMerkleRootSet &&
                                    checkPermissions(profile, '/auctions/:address/finalize', 'post') ? (
                                      <>
                                        <Button
                                          className="btn py-2 px-5 mr-2 btn-orange"
                                          onClick={() => {
                                            setDescription('refund');
                                            setAuctionAddress(auction.address);
                                            setModalTitle('Finalize Auction Confirmation');
                                            setOpenStartModal(true);
                                          }}
                                        >
                                          <i className="fas fa-check-circle mr-2" />
                                          Finalize Auction
                                        </Button>
                                      </>
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
              {auctionList && (
                <div className="footer-wrapper">
                  <PaginationComponent
                    itemsCount={auctionList?.totalItems}
                    itemsPerPage={auctionList?.pageSize}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    alwaysShown={true}
                  />
                  <ItemsPerPage
                    itemsPerPage={auctionList?.pageSize}
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

export default AuctionManagement;
