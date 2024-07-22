/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ethers } from 'ethers';
import { useHistory } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

import metamask from '../../utils/metamask';
import getProvider from '../../utils/getProviders';
import Loader from '../common/Loader';
import ABI from '../../utils/abi/auction';
import { editAuctionSchema } from '../../schema/auctionSchema';
import Layout from '../../pages/Layout';
import ComponentLayout from '../common/ComponentLayout';
import ContentHeader from '../common/ContentHeader';
import ConfirmModal from '../common/modals/ConfirmModal';

function AuctionEditForm(props: any) {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      name: props.auction?.name,
      length: props.auction?.length,
      floorPrice: props.auction?.floorPrice,
      startTime: props.auction?.startBlockTime,
      nftName: props.auction?.nft?.name,
      nftSymbol: props.auction?.nft?.symbol,
      totalSupply: props.auction?.nft?.totalSupply,
      baseURI: props.auction?.nft?.baseUri,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(editAuctionSchema),
  });
  const submitForm = async () => {
    const values = getValues();
    if (Object.keys(errors).length === 0) {
      if (values) {
        await submitAuctionEditForm(values);
      }
    }
  };

  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const closeAuctionModal = () => {
    setOpenEditModal(false);
  };

  const submitAuctionEditForm = async (values: any) => {
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
        const contractAddress = props.auction.address;
        const contractInstance = new ethers.Contract(contractAddress, ABI.abi, provider.getSigner());
        contractInstance.connect(signer);

        const floorPrice = values.floorPrice.toString();
        const auctionArgs = {
          auctionName_: values.name.trim(),
          length_: values.length,
          startingPriceInWeii_: ethers.utils.parseEther(floorPrice.trim()).toString(),
          startTime_: ethers.BigNumber.from(values.startTime),
        };

        await contractInstance.updateAuctionProps(auctionArgs);
        window.localStorage.setItem(
          'sessionmessage',
          JSON.stringify({ message: 'Auction updation in process.', type: 'success' }),
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

  return (
    <>
      <Layout>
        <ToastContainer />
        <ConfirmModal openEditModal={openEditModal} closeAuctionModal={closeAuctionModal} description="edit" />
        <ContentHeader title="Auction Management / Edit" needCreateBtn={false} createUrl="" />
        <ComponentLayout>
          {props.auctionLoading ? (
            <Loader isLoading={props.auctionLoading} />
          ) : (
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
                              readOnly
                              placeholder="Enter Start Date"
                              {...register('startTime', { required: 'Start Time is required' })}
                              className={errors?.startDate?.message ? 'is-invalid form-control' : 'form-control'}
                            />
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
                              readOnly
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
                              readOnly
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
                              readOnly
                              placeholder="Enter Total Supply"
                              {...register('totalSupply')}
                              className={errors?.totalSupply?.message ? 'is-invalid' : ''}
                            />
                            {/* @ts-ignore */}
                            <p className="invalid-feedback d-block">{errors?.totalSupply?.message}</p>
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Row>
                          <Col sm={4}>
                            <Form.Label className="require">NFT BASE URI</Form.Label>
                          </Col>
                          <Col sm={8}>
                            <Form.Control
                              type="text"
                              readOnly
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
                        Update <Loader isLoading={isLoading} />
                      </Button>
                      <Link to="/auctions" className="ml-2 btn btn-danger">
                        Cancel
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </ComponentLayout>
      </Layout>
    </>
  );
}

export default AuctionEditForm;
