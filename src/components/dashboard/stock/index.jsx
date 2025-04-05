


// import React, { useState, useEffect } from "react";
// import {
//     Table, Card, InputGroup, FormControl, Button, Pagination, Row, Col, Form, Modal
// } from "react-bootstrap";
// import { useGetProductQuery, useUpdateProductStockMutation } from "../../../store/features/product/productApi";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import toast styles

// const StockTable = () => {
//     const [search, setSearch] = useState("");
//     const [entries, setEntries] = useState(10);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedStock, setSelectedStock] = useState(null);
//     const [newStock, setNewStock] = useState("");

//     // Fetch products
//     const { data: products, isLoading, isError, refetch } = useGetProductQuery();
//     const [updateStock, { isLoading: isUpdating }] = useUpdateProductStockMutation();

//     useEffect(() => {
//         if (refetch) refetch();
//     }, [refetch]);


//     if (isLoading) {
//         return (
//             <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
//                 <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }

//     if (isError) {
//         return (
//             <div className="alert alert-danger mx-3 mt-3">
//                 <i className="fa fa-exclamation-circle me-2"></i>
//                 Failed to load products. Please try again later.
//             </div>
//         );
//     }

//     const productList = products || [];
//     const filteredData = productList.filter(({ name, sku }) =>
//         name.toLowerCase().includes(search.toLowerCase()) || sku.toLowerCase().includes(search.toLowerCase())
//     );

//     const totalPages = Math.ceil(filteredData.length / entries);
//     const paginatedData = filteredData.slice((currentPage - 1) * entries, currentPage * entries);

//     // Open modal
//     const handleOpenModal = (product) => {
//         setSelectedStock(product);
//         setNewStock(product.stock || "");
//         setShowModal(true);
//     };

//     // Update stock function
//     const handleUpdateStock = async () => {
//         const updatedStock = parseInt(newStock, 10);

//         if (isNaN(updatedStock) || updatedStock < 0) {
//             toast.error("Please enter a valid stock quantity.");
//             return;
//         }
//         if (updatedStock === selectedStock?.stock) {
//             toast.warning("No changes detected in stock quantity.");
//             return;
//         }

//         // Prepare FormData for the API request
//         // const formData = new FormData();
//         // formData.append("stock", updatedStock);

//         try {

//             let formData = {
//                 stock: updatedStock
//             }

//             console.log("updatedStock", formData)
//             console.log("updatedStock id", selectedStock._id)
//             const response = await updateStock({ id: selectedStock._id, formData }).unwrap();
//             toast.success(response?.message || `Stock updated successfully for ${selectedStock.name}`);
//             setShowModal(false);
//         } catch (error) {
//             toast.error(error?.data?.message || "Failed to update stock. Try again.");
//             console.error("Stock update error:", error);
//         }
//     };

//     return (
//         <>
//             <Card className="shadow-lg p-4 rounded-4 border-0">
//                 <h4 className="text-center mb-4 fw-bold">
//                     <i className="fa fa-boxes-stacked me-2 text-primary"></i> Stock Management
//                 </h4>

//                 <Row className="mb-4 d-flex align-items-center">
//                     <Col md={6} className="d-flex align-items-center">
//                         <Form.Label className="me-2 fw-semibold">Show</Form.Label>
//                         <Form.Select value={entries} onChange={(e) => setEntries(Number(e.target.value))} className="w-auto">
//                             {[5, 10, 25, 50].map(num => (
//                                 <option key={num} value={num}>{num}</option>
//                             ))}
//                         </Form.Select>
//                         <Form.Label className="ms-2 fw-semibold">entries</Form.Label>
//                     </Col>
//                     <Col md={6} className="text-md-end">
//                         <InputGroup className="shadow-sm rounded-3">
//                             <FormControl
//                                 placeholder="Search by name or SKU..."
//                                 value={search}
//                                 onChange={(e) => setSearch(e.target.value)}
//                                 className="border-0"
//                             />
//                             <Button variant="primary" className="rounded-end-3">
//                                 <i className="fa fa-search"></i>
//                             </Button>
//                         </InputGroup>
//                     </Col>
//                 </Row>

//                 <Table striped hover responsive className="table-borderless shadow-sm">
//                     <thead className="bg-primary text-white">
//                         <tr>
//                             <th className="text-center">SN</th>
//                             <th>Name</th>
//                             <th>SKU</th>
//                             <th>Stock</th>
//                             <th className="text-center">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {paginatedData.length === 0 ? (
//                             <tr>
//                                 <td colSpan="5" className="text-center text-muted py-4">No data available</td>
//                             </tr>
//                         ) : (
//                             paginatedData.map((item, index) => (
//                                 <tr key={item._id} className="align-middle">
//                                     <td className="text-center">{(currentPage - 1) * entries + index + 1}</td>
//                                     <td>{item.name}</td>
//                                     <td>{item.sku}</td>
//                                     <td className={item.stock === 0 ? "text-danger fw-bold" : ""}>
//                                         {item.stock === 0 ? "Out of Stock" : item.stock}
//                                     </td>
//                                     <td className="text-center">
//                                         <Button
//                                             variant={item.stock === 0 ? "warning" : "outline-primary"}
//                                             size="sm"
//                                             onClick={() => handleOpenModal(item)}
//                                         >
//                                             <i className="fa fa-edit"></i> {item.stock === 0 ? "Update Stock" : "Edit"}
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </Table>

//                 {totalPages > 1 && (
//                     <Pagination className="justify-content-center mt-3">
//                         <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} />
//                         {[...Array(totalPages)].map((_, page) => (
//                             <Pagination.Item key={page + 1} active={page + 1 === currentPage} onClick={() => setCurrentPage(page + 1)}>
//                                 {page + 1}
//                             </Pagination.Item>
//                         ))}
//                         <Pagination.Next disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} />
//                     </Pagination>
//                 )}

//                 <Modal show={showModal} onHide={() => setShowModal(false)}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Update Stock</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Form.Group>
//                             <Form.Label>Enter new stock quantity</Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 min="0"
//                                 value={newStock}
//                                 onChange={(e) => setNewStock(e.target.value)}
//                             />
//                         </Form.Group>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
//                         <Button
//                             variant="primary"
//                             onClick={handleUpdateStock}
//                             disabled={isUpdating || newStock === "" || newStock === selectedStock?.stock}
//                         >
//                             {isUpdating ? "Saving..." : "Save Changes"}
//                         </Button>
//                     </Modal.Footer>
//                 </Modal>
//             </Card>

//             <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />
//         </>
//     );
// };

// export default StockTable;


import React, { useState, useEffect } from "react";
import {
    Table, Card, InputGroup, FormControl, Button,
    Pagination, Row, Col, Form, Modal, Spinner, Alert
} from "react-bootstrap";
import { FaBoxes, FaSearch, FaEdit, FaExclamationCircle } from "react-icons/fa";
import { useGetProductQuery, useUpdateProductStockMutation } from "../../../store/features/product/productApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StockTable = () => {
    const [search, setSearch] = useState("");
    const [entries, setEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);
    const [newStock, setNewStock] = useState("");

    // Fetch products
    const { data: products, isLoading, isError, refetch } = useGetProductQuery();
    const [updateStock, { isLoading: isUpdating }] = useUpdateProductStockMutation();

    useEffect(() => {
        if (refetch) refetch();
    }, [refetch]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (isError) {
        return (
            <Alert variant="danger" className="mx-3 mt-3">
                <FaExclamationCircle className="me-2" />
                Failed to load products. Please try again later.
            </Alert>
        );
    }

    const productList = products || [];
    const filteredData = productList.filter(({ name, sku }) =>
        name.toLowerCase().includes(search.toLowerCase()) ||
        sku.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / entries);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * entries,
        currentPage * entries
    );

    const handleOpenModal = (product) => {
        setSelectedStock(product);
        setNewStock(product.stock || "");
        setShowModal(true);
    };

    const handleUpdateStock = async () => {
        const updatedStock = parseInt(newStock, 10);

        if (isNaN(updatedStock) || updatedStock < 0) {
            toast.error("Please enter a valid stock quantity.");
            return;
        }
        if (updatedStock === selectedStock?.stock) {
            toast.warning("No changes detected in stock quantity.");
            return;
        }

        try {
            const formData = { stock: updatedStock };
            const response = await updateStock({
                id: selectedStock._id,
                formData
            }).unwrap();

            toast.success(response?.message || `Stock updated successfully for ${selectedStock.name}`);
            setShowModal(false);
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update stock. Try again.");
            console.error("Stock update error:", error);
        }
    };

    // Generate pagination items with ellipsis for large page counts
    const renderPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <Pagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => setCurrentPage(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }
        } else {
            // Always show first page
            items.push(
                <Pagination.Item
                    key={1}
                    active={1 === currentPage}
                    onClick={() => setCurrentPage(1)}
                >
                    1
                </Pagination.Item>
            );

            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) {
                endPage = 4;
            } else if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
            }

            if (currentPage > 3) {
                items.push(<Pagination.Ellipsis key="start-ellipsis" />);
            }

            for (let i = startPage; i <= endPage; i++) {
                items.push(
                    <Pagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => setCurrentPage(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }

            if (currentPage < totalPages - 2) {
                items.push(<Pagination.Ellipsis key="end-ellipsis" />);
            }

            // Always show last page
            items.push(
                <Pagination.Item
                    key={totalPages}
                    active={totalPages === currentPage}
                    onClick={() => setCurrentPage(totalPages)}
                >
                    {totalPages}
                </Pagination.Item>
            );
        }

        return items;
    };

    return (
        <>
            <Card className="shadow-sm border-0 rounded-3">
                <Card.Header className="bg-white border-0 py-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-semibold">
                            <FaBoxes className="me-2 text-primary" />
                            Stock Management
                        </h5>
                        <div className="d-flex align-items-center">
                            <Form.Select
                                value={entries}
                                onChange={(e) => {
                                    setEntries(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="me-2 w-auto"
                                size="sm"
                            >
                                {[5, 10, 25, 50].map(num => (
                                    <option key={num} value={num}>{num} entries</option>
                                ))}
                            </Form.Select>
                            <InputGroup size="sm" style={{ width: "250px" }}>
                                <FormControl
                                    placeholder="Search by name or SKU..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="border-end-0"
                                />
                                <Button variant="outline-secondary" className="border-start-0">
                                    <FaSearch />
                                </Button>
                            </InputGroup>
                        </div>
                    </div>
                </Card.Header>

                <Card.Body className="p-0">
                    <div className="table-responsive">
                        <Table hover className="mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th width="5%" className="text-center">#</th>
                                    <th width="40%">Product Name</th>
                                    {/* <th width="20%">SKU</th> */}
                                    <th width="20%">Stock Level</th>
                                    <th width="15%" className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-muted">
                                            No products found matching your criteria
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedData.map((item, index) => (
                                        <tr key={item._id}>
                                            <td className="text-center text-muted">
                                                {(currentPage - 1) * entries + index + 1}
                                            </td>
                                            <td className="fw-semibold">{item.name}</td>
                                            {/* <td className="text-muted">{item.sku}</td> */}
                                            <td>
                                                <span className={`badge ${item.stock === 0 ?
                                                    'bg-danger' : 'bg-success'} p-2`}
                                                >
                                                    {item.stock === 0 ? 'Out of Stock' : item.stock}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <Button
                                                    variant={item.stock === 0 ? "warning" : "outline-primary"}
                                                    size="sm"
                                                    onClick={() => handleOpenModal(item)}
                                                    className="px-3"
                                                >
                                                    <FaEdit className="me-1" />
                                                    {item.stock === 0 ? "Restock" : "Update"}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>

                {totalPages > 1 && (
                    <Card.Footer className="bg-white border-0 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="text-muted">
                                Showing <strong>{paginatedData.length}</strong> of <strong>{filteredData.length}</strong> products
                            </div>
                            <Pagination className="mb-0">
                                <Pagination.First
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(1)}
                                />
                                <Pagination.Prev
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                />
                                {renderPaginationItems()}
                                <Pagination.Next
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                />
                                <Pagination.Last
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(totalPages)}
                                />
                            </Pagination>
                        </div>
                    </Card.Footer>
                )}
            </Card>

            {/* Update Stock Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update Stock Level</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedStock && (
                        <>
                            <p className="mb-3">
                                Updating stock for: <strong>{selectedStock.name}</strong>
                            </p>
                            <Form.Group>
                                <Form.Label>New Stock Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    value={newStock}
                                    onChange={(e) => setNewStock(e.target.value)}
                                    placeholder="Enter quantity"
                                    autoFocus
                                />
                                <Form.Text className="text-muted">
                                    Current stock: {selectedStock.stock}
                                </Form.Text>
                            </Form.Group>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleUpdateStock}
                        disabled={isUpdating || newStock === "" || newStock === selectedStock?.stock}
                    >
                        {isUpdating ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                <span className="ms-2">Updating...</span>
                            </>
                        ) : (
                            "Confirm Update"
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
};

export default StockTable;