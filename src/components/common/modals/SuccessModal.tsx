import { Modal } from 'react-bootstrap';

function SuccessModal(props: any) {
  return (
    <>
      <Modal show={true} onHide={() => {}} centered>
        <Modal.Body>
          <div className="success-checkmark">
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
          <p className="modal-description">{props.description}</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-right">
          <button onClick={props.handleModalToggle} type="button" className="btn pt-2 btn-danger">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SuccessModal;
