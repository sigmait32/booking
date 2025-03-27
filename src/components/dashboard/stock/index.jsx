import React, { useState } from "react";
import { Table, Card, InputGroup, FormControl, Button, Pagination, Row, Col, Form, Modal } from "react-bootstrap";

const StockTable = () => {
    const [search, setSearch] = useState("");
    const [entries, setEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [newStock, setNewStock] = useState("");

    // Sample stock data
    const [stockData, setStockData] = useState([
        { id: 1, name: "iPhone 13", sku: "IPH13-001", stock: 50, sold: 30 },
        { id: 2, name: "Samsung Galaxy S23", sku: "SGS23-002", stock: 40, sold: 20 },
        { id: 3, name: "MacBook Pro", sku: "MBP-003", stock: 0, sold: 25 },
        { id: 4, name: "Sony Headphones", sku: "SH-004", stock: 60, sold: 45 },
        { id: 5, name: "Dell XPS", sku: "DXPS-005", stock: 0, sold: 5 },
        { id: 6, name: "HP Pavilion", sku: "HPP-006", stock: 30, sold: 15 },
    ]);

    // Filter data based on search query
    const filteredData = stockData.filter(
        ({ name, sku }) =>
            name.toLowerCase().includes(search.toLowerCase()) || sku.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / entries);
    const paginatedData = filteredData.slice((currentPage - 1) * entries, currentPage * entries);

    // Open the modal for updating stock
    const handleOpenModal = (stockItem) => {
        setSelectedStock(stockItem);
        setNewStock(""); // Reset input
        setShowModal(true);
    };

    // Handle updating stock
    const handleUpdateStock = () => {
        const updatedStock = parseInt(newStock, 10);
        if (isNaN(updatedStock) || updatedStock <= 0) {
            alert("Please enter a valid stock quantity.");
            return;
        }

        setStockData((prevData) =>
            prevData.map((item) =>
                item.id === selectedStock.id ? { ...item, stock: updatedStock } : item
            )
        );

        setShowModal(false);
    };

    return (
        <Card className="shadow-lg p-4 rounded-4 border-0">
            <h4 className="text-center mb-4 fw-bold">
                <i className="fa fa-boxes-stacked me-2 text-primary"></i> Stock Management
            </h4>

            {/* Entries and Search Row */}
            <Row className="mb-4 d-flex align-items-center">
                <Col md={6} className="d-flex align-items-center">
                    <Form.Label className="me-2 fw-semibold">Show</Form.Label>
                    <Form.Select value={entries} onChange={(e) => setEntries(Number(e.target.value))} className="w-auto">
                        {[5, 10, 25, 50].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Label className="ms-2 fw-semibold">entries</Form.Label>
                </Col>

                <Col md={6} className="text-md-end">
                    <InputGroup className="shadow-sm rounded-3">
                        <FormControl
                            placeholder="Search by name or SKU..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border-0"
                        />
                        <Button variant="primary" className="rounded-end-3">
                            <i className="fa fa-search"></i>
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            {/* Data Table */}
            <Table striped hover responsive className="table-borderless shadow-sm">
                <thead className="bg-primary text-white">
                    <tr>
                        <th className="text-center">SN</th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Stock</th>
                        <th>Sold</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center text-muted py-4">
                                No data available
                            </td>
                        </tr>
                    ) : (
                        paginatedData.map((item, index) => (
                            <tr key={item.id} className="align-middle">
                                <td className="text-center">{(currentPage - 1) * entries + index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.sku}</td>
                                <td className={item.stock === 0 ? "text-danger fw-bold" : ""}>
                                    {item.stock === 0 ? "Out of Stock" : item.stock}
                                </td>
                                <td>{item.sold}</td>
                                <td className="text-center">
                                    <Button
                                        variant={item.stock === 0 ? "warning" : "outline-primary"}
                                        size="sm"
                                        onClick={() => handleOpenModal(item)}
                                    >
                                        <i className="fa fa-edit"></i> {item.stock === 0 ? "Update Stock" : "Edit"}
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination className="justify-content-center mt-3">
                    <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
                    {[...Array(totalPages)].map((_, page) => (
                        <Pagination.Item key={page + 1} active={page + 1 === currentPage} onClick={() => setCurrentPage(page + 1)}>
                            {page + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
                </Pagination>
            )}

            {/* Update Stock Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Stock</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Enter new stock quantity</Form.Label>
                        <Form.Control type="number" min="1" value={newStock} onChange={(e) => setNewStock(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateStock}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default StockTable;
