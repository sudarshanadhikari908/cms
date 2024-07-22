import { useState } from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = (props: any) => {
  const [show, setShow] = useState(true);
  if (show && props.display) {
    return (
      <>
        <Alert variant={props.type} onClose={() => setShow(false)}>
          {props.message}
        </Alert>
      </>
    );
  } else {
    return null;
  }
};

export default AlertMessage;
