import { useEffect } from 'react';
import { useParams } from 'react-router';
import { getEmailTemplateById } from '../../redux/actions/emailTemplateAction';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import EmailEditForm from '../forms/EmailEditForm';

function EmailEdit() {
  const { id } = useParams<any>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEmailTemplateById({ id }));
  }, [dispatch, id]);

  const { emailDataById, emailLoading } = useAppSelector<any>((state) => state.emailReducer);

  return <>{emailDataById && <EmailEditForm id={id} data={emailDataById} emailLoading={emailLoading} />}</>;
}

export default EmailEdit;
