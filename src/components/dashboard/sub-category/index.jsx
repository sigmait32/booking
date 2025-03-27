

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchSubCategories, deleteSubCategory, resetDeleteStatus } from '../../../store/reducers/subCategoryReducer';
// import { Link, useNavigate } from 'react-router-dom';
// import { Table, Button, Spinner, Alert, Container, Form } from 'react-bootstrap';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SubCategoryList = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { items, status, deleteStatus, error } = useSelector(state => state.subCategories);
//     const [searchTerm, setSearchTerm] = useState('');

//     useEffect(() => {
//         dispatch(fetchSubCategories());
//     }, [dispatch]);

//     useEffect(() => {
//         if (deleteStatus === 'succeeded') {
//             toast.success('Sub-category deleted successfully!');
//             dispatch(resetDeleteStatus());
//         } else if (deleteStatus === 'failed') {
//             toast.error('Failed to delete sub-category!');
//             dispatch(resetDeleteStatus());
//         }
//     }, [deleteStatus, dispatch]);

//     const handleDelete = async (id) => {
//         try {
//             await dispatch(deleteSubCategory(id)).unwrap();
//         } catch (error) {
//             console.error('Failed to delete sub-category:', error);
//         }
//     };

//     if (status === 'loading') {
//         return (
//             <Container className="text-center mt-5">
//                 <Spinner animation="border" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </Spinner>
//             </Container>
//         );
//     }

//     if (error) {
//         return (
//             <Container className="mt-5">
//                 <Alert variant="danger">{error}</Alert>
//             </Container>
//         );
//     }

//     // Filter sub-categories based on search input
//     const filteredItems = items?.filter(item =>
//         item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <Container className="mt-4">
//             <ToastContainer />
//             <h2>Sub-Categories</h2>
//             <Button
//                 variant="primary"
//                 className="mb-3"
//                 onClick={() => navigate('/dashboard/add-sub-category')}
//             >
//                 Add Sub-Category
//             </Button>

//             <Form.Control
//                 type="text"
//                 placeholder="Search sub-categories..."
//                 className="mb-3"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />

//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredItems.length > 0 ? (
//                         filteredItems.map(item => (
//                             <tr key={item._id}>
//                                 <td>{item.name}</td>
//                                 <td>
//                                     <Link to={`/dashboard/edit-sub-category/${item._id}`} className="btn btn-primary me-2">Edit</Link>
//                                     <Button
//                                         variant="danger"
//                                         onClick={() => handleDelete(item._id)}
//                                         disabled={deleteStatus === 'loading'}
//                                     >
//                                         {deleteStatus === 'loading' ? 'Deleting...' : 'Delete'}
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="2" className="text-center">No sub-categories found</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };

// export default SubCategoryList;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubCategories, deleteSubCategory, resetDeleteStatus } from '../../../store/reducers/subCategoryReducer';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Spinner, Alert, Container, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';

const SubCategoryList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, status, deleteStatus, error } = useSelector(state => state.subCategories);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch sub-categories on component mount
    useEffect(() => {
        dispatch(fetchSubCategories());
    }, [dispatch]);

    // Show toast messages based on deleteStatus
    useEffect(() => {
        if (deleteStatus === 'succeeded') {
            toast.success('Sub-category deleted successfully!');
            dispatch(resetDeleteStatus());
        } else if (deleteStatus === 'failed') {
            toast.error('Failed to delete sub-category!');
            dispatch(resetDeleteStatus());
        }
    }, [deleteStatus, dispatch]);

    // Handle delete action
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this sub-category?')) {
            try {
                await dispatch(deleteSubCategory(id)).unwrap();
            } catch (error) {
                console.error('Failed to delete sub-category:', error);
            }
        }
    };

    // Filter sub-categories based on search input
    const filteredItems = items?.filter(item =>
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination calculations
    const currentItems = filteredItems?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Columns for the DataTable
    const columns = [
        {
            name: '#',
            selector: (row, index) => (currentPage - 1) * itemsPerPage + index + 1,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/dashboard/edit-sub-category/${row._id}`} className="btn btn-sm btn-primary">
                        Edit
                    </Link>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(row._id)}
                        disabled={deleteStatus === 'loading'}
                    >
                        Delete
                    </button>
                </div>
            ),
            width: '150px', // Fixed width for the Actions column
        },
    ];

    // Loading state
    if (status === 'loading') {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-danger" role="alert">
                    Failed to load sub-categories. Please try again later.
                </div>
            </div>
        );
    }

    return (
        <>
            <ToastContainer />
            <div className="container-fluid">
                <div className="row row-cols-1 g-3 g-md-5">
                    <div className="col">
                        <div className="bg-white px-4 py-5 rounded-3">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <Button
                                    variant="primary"
                                    onClick={() => navigate('/dashboard/add-sub-category')}
                                >
                                    + Add Sub-Category
                                </Button>
                                <input
                                    className="form-control w-50"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search sub-categories..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="bg-white rounded-3 shadow-sm p-3">
                            <DataTable
                                columns={columns}
                                data={currentItems}
                                pagination
                                paginationServer
                                paginationTotalRows={filteredItems?.length}
                                paginationPerPage={itemsPerPage}
                                paginationDefaultPage={currentPage}
                                onChangePage={setCurrentPage}
                                noDataComponent={<div className="text-center py-4">No sub-categories found</div>}
                                customStyles={{
                                    headCells: {
                                        style: {
                                            backgroundColor: '#f8f9fa',
                                            fontWeight: 'bold',
                                        },
                                    },
                                    rows: {
                                        style: {
                                            '&:hover': {
                                                backgroundColor: '#f1f1f1',
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubCategoryList;