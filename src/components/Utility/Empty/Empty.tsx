import React, { FunctionComponent } from 'react';

type ModalProps = {
  message: string;
  short?: boolean;
  bigIcon?: boolean;
};

const Empty: FunctionComponent<ModalProps> = ({ message, short, bigIcon }) => {
  return (
    <div className="notification-container" style={{ minHeight: short ? 'auto' : '150px' }} data-cy="notificationContainer">
      <b>
        <i style={{ fontSize: `${bigIcon ? '35px' : '25px'}` }} className="ni ni-app"></i>
      </b>
      <p className="mb-0">{message}</p>
    </div>
  );
};

export default Empty;
