/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

import { auctionSchema } from '../../schema/auctionSchema';
import getProvider from '../../utils/getProviders';
import metamask from '../../utils/metamask';
import ABI from '../../utils/abi/auctionFactory';
import Layout from '../../pages/Layout';
import ComponentLayout from '../common/ComponentLayout';
import ContentHeader from '../common/ContentHeader';
import Loader from '../common/Loader';

const AuctionForm = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<any>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(auctionSchema),
  });
  const submitForm = async () => {
    const values = getValues();
    if (Object.keys(errors).length === 0) {
      if (values) {
        await submitAuctionForm(values);
      }
    }
  };

  const submitAuctionForm = async (values: any) => {
    if (!metamask.isConnected()) {
      toast.error('Please install and connect metamask before using any features.');
      return;
    }
    try {
      setIsLoading(true);
      const metamaskProvider = await getProvider();
      let provider;
      if (metamaskProvider) {
        provider = new ethers.providers.Web3Provider(metamaskProvider);
      }
      if (provider) {
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();

        const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
        const contractInstance = new ethers.Contract(contractAddress, ABI.abi, provider.getSigner());
        contractInstance.connect(signer);
        const auctionArgs = {
          auctionName_: values.name.trim(),
          length_: values.length,
          startingPriceInWeii_: ethers.utils.parseEther(values.floorPrice.trim()).toString(),
          startTime_: ethers.BigNumber.from(new Date(values.startTime).getTime()),
        };

        const nftArgs = {
          name_: values.nftName.trim(),
          symbol_: values.nftSymbol.trim(),
          totalSupply_: ethers.BigNumber.from(values.totalSupply),
          baseURI_: values.baseURI.trim(),
        };

        const ownerAddress = await signer.getAddress();

        await contractInstance.createAuction(auctionArgs, nftArgs, ownerAddress);
        window.localStorage.setItem(
          'sessionmessage',
          JSON.stringify({ message: 'New Auction is being processed and will be created soon.', type: 'success' }),
        );
        setIsLoading(false);
        history.push('/auctions');
      }
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error?.error?.message || error?.message;
      toast.error(errorMessage);
    }
  };
  const minDate = moment().format('YYYY-MM-DD hh:mm');

  return (
    <>
      <Layout>
        <ToastContainer />
        <ContentHeader title="Auction Management / Add New Auction" needCreateBtn={false} createUrl="" />
        <ComponentLayout>
          <Form onSubmit={handleSubmit(submitForm)}>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={4}>
                          <Form.Label className="require">Auction Name</Form.Label>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            placeholder="Enter Auction name"
                            {...register('name')}
                            className={errors?.name?.message ? 'is-invalid' : ''}
                          />
                          {/* @ts-ignore */}
                          <p className="invalid-feedback d-block">{errors?.name?.message}</p>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={4}>
                          <Form.Label className="require">Auction Length</Form.Label>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            placeholder="Enter Length as hours"
                            {...register('length')}
                            className={errors?.length?.message ? 'is-invalid' : ''}
                          />
                          {/* @ts-ignore */}
                          <p className="invalid-feedback d-block">{errors?.length?.message}</p>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={4}>
                          <Form.Label className="require">Base Price (Eth)</Form.Label>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            placeholder="Enter Base Price as ETH"
                            {...register('floorPrice')}
                            className={errors?.floorPrice?.message ? 'is-invalid' : ''}
                          />
                          {/* @ts-ignore */}
                          <p className="invalid-feedback d-block">{errors?.floorPrice?.message}</p>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={4}>
                          <Form.Label className="require">Start Time (Approx.)</Form.Label>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            type="datetime-local"
                            {...register('startTime', { required: 'Start Time is required' })}
                            className={errors?.startDate?.message ? 'is-invalid' : ''}
                            min={minDate}
                          />
                          {/* @ts-ignore */}
                          <p className="invalid-feedback d-block">{errors?.startTime?.message}</p>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={4}>
                          <Form.Label className="require">NFT Name</Form.Label>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            placeholder="Enter NFT  Name"
                            {...register('nftName')}
                            className={errors?.nftName?.message ? 'is-invalid' : ''}
                          />
                          {/* @ts-ignore */}
                          <p className="invalid-feedback d-block">{errors?.nftName?.message}</p>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={4}>
                          <Form.Label className="require">NFT Symbol</Form.Label>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            placeholder="Enter NFT Symbol"
                            {...register('nftSymbol')}
                            className={errors?.nftSymbol?.message ? 'is-invalid' : ''}
                          />
                          {/* @ts-ignore */}
                          <p className="invalid-feedback d-block">{errors?.nftSymbol?.message}</p>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Row>
                        <Col sm={4}>
                          <Form.Label className="require">Total Supply</Form.Label>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            placeholder="Enter Total Supply"
                            {...register('totalSupply')}
                            className={errors?.totalSupply?.message ? 'is-invalid' : ''}
                          />
                          {/* @ts-ignore */}
                          <p className="invalid-feedback d-block">{errors?.totalSupply?.message}</p>
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group>
                      <Row>
                        <Col sm={4}>
                          <Form.Label className="require">NFT BASE URI</Form.Label>
                        </Col>
                        <Col sm={8}>
                          <Form.Control
                            type="text"
                            placeholder="Enter NFT BASE URI"
                            {...register('baseURI')}
                            className={errors?.baseURI?.message ? 'is-invalid' : ''}
                          />
                          {/* @ts-ignore */}
                          <p className="invalid-feedback d-block">{errors?.baseURI?.message}</p>
                        </Col>
                      </Row>
                    </Form.Group>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-sm-12">
                    <Button type="submit">
                      Save <Loader isLoading={isLoading} />
                    </Button>
                    <Link to="/auctions" className="ml-2 btn btn-danger">
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </ComponentLayout>
      </Layout>
    </>
  );
};

export default AuctionForm;
