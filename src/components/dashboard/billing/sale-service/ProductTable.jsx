import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ProductTable = ({ products, onDelete }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Rate</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map((prod, idx) => (
                    <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{prod.name}</td>
                        <td>{prod.price}</td>
                        <td>{prod.quantity}</td>
                        <td>{prod.price * prod.quantity}</td>
                        <td>
                            <Button variant="danger" size="sm" onClick={() => onDelete(idx)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ProductTable;
