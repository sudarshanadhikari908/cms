/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Helper from '../../utils/helper';
import { editProfileSchema } from '../../schema/userSchema';
import Loader from '../common/Loader';

function EditAccountSettings(props: any) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      fname: props?.fname,
      lname: props?.lname,
      contact: props?.contact,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(editProfileSchema),
  });

  const submitForm = async () => {
    const values = getValues();
    if (Object.keys(errors).length === 0) {
      if (values) {
        props.handleEditSubmit(values);
      }
    }
  };
  const cancelHandler = () => {
    reset();
    props.setServerErrors([]);
    setValue('fname', props?.fname);
    setValue('lname', props?.lname);
    setValue('contact', props?.contact);
    props.handleModalToggle();
  };

  const handleInputChange = (e: any) => {
    if (props.serverErrors.length !== 0) {
      props.setServerErrors(
        props.serverErrors.filter((item: any) => {
          return item.name !== e.target.name;
        }),
      );
    }
  };

  return (
    <>
      <Modal className="form-modal" show={props.modalToggle}>
        <Modal.Header>
          <Modal.Title className='font-weight-bold'>Edit Profile</Modal.Title>
          <div className="float-right">
            <i onClick={cancelHandler} className="crossIcon nav-icon fas fa-times"></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitForm)} className="form-inline row align-items-start">
            <Form.Group className="mb-3 col-xl-6" controlId="firstName">
              <Form.Label className="require mb-1 justify-content-start ">First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                {...register('fname', {
                  onChange: handleInputChange,
                })}
                isInvalid={Helper.isColError('firstName', props.serverErrors) || errors?.fname?.message}
              />
              <Form.Control.Feedback type="invalid">
                {Helper.getErrorMsg('firstName', props.serverErrors)}
              </Form.Control.Feedback>
              {/* @ts-ignore */}
              <p className="invalid-feedback">{errors?.fname?.message}</p>
            </Form.Group>

            <Form.Group className="mb-3 col-xl-6" controlId="lastName">
              <Form.Label className="require mb-1 justify-content-start">Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                {...register('lname', {
                  onChange: handleInputChange,
                })}
                isInvalid={Helper.isColError('lastName', props.serverErrors) || errors?.lname?.message}
              />
              <Form.Control.Feedback type="invalid">
                {Helper.getErrorMsg('lastName', props.serverErrors)}
              </Form.Control.Feedback>
              {/* @ts-ignore */}
              <p className="invalid-feedback"> {errors?.lname?.message} </p>
            </Form.Group>
            <Form.Group className="mb-3 col-xl-6" controlId="email">
              <Form.Label className="mb-1 justify-content-start">Email</Form.Label>
              <Form.Control disabled value={props.email} />
              {/* @ts-ignore */}
              <p className="invalid-feedback"> {errors?.email?.message} </p>
            </Form.Group>
            <Form.Group className="mb-3 col-xl-6" controlId="contact">
              <Form.Label className="text-left mb-1 justify-content-start">Phone Number</Form.Label>
              <Form.Control
                type="phone"
                {...register('contact', {
                  onChange: handleInputChange,
                })}
                placeholder="Contact"
                isInvalid={Helper.isColError('contact', props.serverErrors) || errors?.contact?.message}
              />
              <Form.Control.Feedback type="invalid">
                {Helper.getErrorMsg('contact', props.serverErrors)}
              </Form.Control.Feedback>
              {/* @ts-ignore */}
              <p className="invalid-feedback">{errors?.contact?.message}</p>
            </Form.Group>
            <div className="text-center col-xl-12 d-flex justify-content-start mt-2">
              <button onClick={cancelHandler} className="btn pt-2 mr-2 btn-danger" type="button">
                {props.dangerBtn}
              </button>
              <button type="submit" className="btn pt-2 btn-primary">
                {props.successBtn} <Loader isLoading={props.loading} />
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditAccountSettings;
