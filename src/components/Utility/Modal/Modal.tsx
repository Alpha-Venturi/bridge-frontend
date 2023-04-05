import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = (props: any) => {
  const { closeModal, className, title, size } = props;

  const close = () => {
    closeModal(false);
  };

  return (
    <div>
      <Modal size={size ? size : 'lg'} isOpen={true} fade={false} className={className} toggle={close}>
        <ModalHeader>{title}</ModalHeader>
        {props.children}
      </Modal>
    </div>
  );
};

export default ModalExample;
