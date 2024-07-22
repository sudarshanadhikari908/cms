import { SetStateAction, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import OtpInput from 'react-otp-input';

const OTPModal = (props: any) => {
  const [otpCode, setOtpCode] = useState<string>('');

  const otpChangeHandler = (otp: SetStateAction<string>) => {
    props.setModalError(false);
    props.setBtnColor('primary');
    setOtpCode(otp);
  };

  return (
    <Modal
      show={props.modalToggle}
      onHide={() => {
        props.handleModalToggle;
      }}
      centered
    >
      <Modal.Header className="logo-name">
        <Modal.Title>Avalon Corp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3 otp-wrap text-center" controlId="otp">
            <Form.Label className="text-center mb-3">
              Enter 6-Digit Code from your Google <br />
              Authenticator App
            </Form.Label>
            <OtpInput
              value={otpCode}
              isInputNum={true}
              onChange={otpChangeHandler}
              numInputs={6}
              hasErrored={props.modalError}
              errorStyle="otp-wrap-error"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <button
          onClick={() => props.handleOTPSubmit(otpCode)}
          type="button"
          className={`btn pt-2 btn-${props.btnColor} w-50`}
        >
          Verify
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default OTPModal;
