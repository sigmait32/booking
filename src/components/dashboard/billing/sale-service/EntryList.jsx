import { Table, Button, Form, Row, Col } from 'react-bootstrap';

const EntryList = ({ items }) => {
    return (
        <>
            <h5 className="mb-3">Product List</h5>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Batch No.</th>
                        <th>Qty</th>
                        <th>Buying Price</th>
                        <th>Selling Price</th>
                        <th>Discount</th>
                        <th>Taxes (SGST, CGST, IGST)</th>
                        <th>Shipping</th>
                        <th>Total Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.product}</td>
                            <td>{item.batchNumber}</td>
                            <td>{item.quantity}</td>
                            <td>{item.costPrice}</td>
                            <td>{item.price}</td>
                            <td>{item.discount}</td>
                            <td>
                                {item.sgst} / {item.cgst} / {item.igst}
                            </td>
                            <td>{item.isFreeShipping ? "Free" : item.shipping}</td>
                            <td>{item.amount}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(idx)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default EntryList;