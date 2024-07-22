import { Modal } from 'react-bootstrap';
import Loader from '../Loader';

function ConfirmModal(props: any) {
  return (
    <>
      <Modal show={props.openStartModal} centered>
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
          <div className="float-right">
            <i onClick={props.closeStartModal} className="crossIcon nav-icon fas fa-times"></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          {props.description === 'refund' ? (
            <h5 className="modal-description text-left lead">
              Are you sure you want to <b> finalize</b> this auction?
            </h5>
          ) : (
            <h5 className="modal-description text-left lead">
              Are you sure you want to <b>{props.description}</b> this auction?
            </h5>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-right">
          <button onClick={props.closeStartModal} type="button" className="btn pt-2 btn-danger">
            No
          </button>
          {props.description === 'start' ? (
            <>
              <button
                onClick={() => {
                  props.startAction(props.auctionAddress, props.auctionId);
                }}
                type="button"
                className="btn pt-2 btn-primary"
              >
                Yes <Loader isLoading={props.startLoader} />
              </button>
            </>
          ) : props.description === 'refund' ? (
            <>
              <button
                onClick={() => props.refundAction(props.auctionAddress)}
                type="button"
                className="btn pt-2 btn-primary"
              >
                Yes <Loader isLoading={props.startLoader} />
              </button>
            </>
          ) : props.description === 'close' ? (
            <>
              <button
                onClick={() => props.closeAction(props.auctionAddress)}
                type="button"
                className="btn pt-2 btn-primary"
              >
                Yes <Loader isLoading={props.startLoader} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  props.pauseAction(props.auctionAddress, props.description);
                }}
                type="button"
                className="btn pt-2 btn-primary"
              >
                Yes <Loader isLoading={props.startLoader} />
              </button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
