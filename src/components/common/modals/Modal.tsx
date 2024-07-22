import { Modal } from 'react-bootstrap';

const CommonModal = (props: any) => {
  return (
    <>
      <Modal
        show={props.modalToggle}
        onHide={() => {
          props.handleModalToggle;
          props.resetUserId(-1);
        }}
        centered
      >
        <Modal.Header>
          <Modal.Title>Delete Confirmation</Modal.Title>
          <div className="float-right">
            <i onClick={props.handleModalToggle} className="crossIcon nav-icon fas fa-times"></i>
          </div>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer className="d-flex justify-content-right">
          <button onClick={props.handleModalToggle} type="button" className="btn pt-2 btn-danger">
            Cancel
          </button>
          <button onClick={props.handleItemDelete} type="button" className="btn pt-2 btn-primary">
            Continue
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommonModal;
