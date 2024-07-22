/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema } from '../../schema/userSchema';
import Loader from '../common/Loader';
import Helper from '../../utils/helper';

function ResetPasswordAccount(props: any) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<any>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(changePasswordSchema),
  });

  const cancelHandler = () => {
    props.handleModalToggle();
    props.setPasswordResetServerErrors([]);
    reset();
  };

  const submitForm = async () => {
    const values = getValues();
    if (Object.keys(errors).length === 0) {
      if (values) {
        await props.handlePasswordReset(values);
      }
    }
    reset();
  };
  const handleInputChange = (e: any) => {
    if (props.passwordResetServerErrors.length !== 0) {
      props.setPasswordResetServerErrors(
        props.passwordResetServerErrors.filter((item: any) => {
          return item.name !== e.target.name;
        }),
      );
    }
  };
  return (
    <>
      <Modal
        show={props.modalToggle}
        onHide={() => {
          props.handleModalToggle;
          // props.resetUserId(-1);
        }}
      >
        <Modal.Header>
          <Modal.Title className='font-weight-bold'>Reset Password</Modal.Title>
          <div className="float-right">
            <i onClick={cancelHandler} className="crossIcon nav-icon fas fa-times"></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="mb-3" controlId="oldPassword">
              <Form.Label className="require">Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Current Password"
                {...register('oldPassword', {
                  onChange: handleInputChange,
                })}
                isInvalid={
                  Helper.isColError('oldPassword', props.passwordResetServerErrors) || errors?.oldPassword?.message
                }
              />
              <Form.Control.Feedback type="invalid">
                {Helper.getErrorMsg('oldPassword', props.passwordResetServerErrors)}
              </Form.Control.Feedback>
              {/* @ts-ignore */}
              <p className="invalid-feedback">{errors?.oldPassword?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label className="require">New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                {...register('password', {
                  onChange: handleInputChange,
                })}
                isInvalid={Helper.isColError('password', props.passwordResetServerErrors) || errors?.password?.message}
              />
              <Form.Control.Feedback type="invalid">
                {Helper.getErrorMsg('password', props.passwordResetServerErrors)}
              </Form.Control.Feedback>
              {/* @ts-ignore */}
              <p className="invalid-feedback">{errors?.password?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label className="require">Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  onChange: handleInputChange,
                })}
                isInvalid={
                  Helper.isColError('confirmPassword', props.passwordResetServerErrors) ||
                  errors?.confirmPassword?.message
                }
              />
              <Form.Control.Feedback type="invalid">
                {Helper.getErrorMsg('confirmPassword', props.passwordResetServerErrors)}
              </Form.Control.Feedback>
              {/* @ts-ignore */}
              <p className="invalid-feedback">{errors?.confirmPassword?.message}</p>
            </Form.Group>
            <button onClick={cancelHandler} type="button" className="btn pt-2 mr-2 btn-danger">
              {props.dangerBtn}
            </button>
            <button type="submit" className="btn pt-2 btn-primary">
              {props.successBtn} <Loader isLoading={props.loading} />
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ResetPasswordAccount;
