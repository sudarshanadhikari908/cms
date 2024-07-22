import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getAuctionById } from '../../redux/actions/auctionAction';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import AuctionEditForm from '../../components/forms/AuctionEditForm';

function AuctionEdit() {
  const { id } = useParams<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAuctionById({ id }));
  }, [dispatch]);
  const { auction, auctionLoading } = useAppSelector<any>((state) => state.auction);
  return (
    <>
      {auction && (
        <>
          <AuctionEditForm auction={auction} auctionLoading={auctionLoading} />
        </>
      )}
    </>
  );
}

export default AuctionEdit;
