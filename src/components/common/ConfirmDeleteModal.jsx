import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmDeleteModal = ({ show, onHide, onConfirm, title = "Delete Record", message = "Are you sure you want to delete this record?" }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className="bg-danger text-white">
                <Modal.Title>
                    <i className="fa fa-trash me-2" />
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="mb-0">{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Yes, Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteModal;
