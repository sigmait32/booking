

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from "../../../store/features/employee/employeeApi";

const List = () => {
    // State Management
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // API Hooks
    const { data, isLoading, error, refetch } = useGetEmployeesQuery();
    const employees = data?.data || [];

    const [deleteEmployee] = useDeleteEmployeeMutation();

    // Side Effects
    useEffect(() => {
        refetch();
    }, [refetch]);

    // Data Processing
    const filteredEmployees = employees.filter(emp =>
        emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.mobileNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentItems = filteredEmployees.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handlers
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                await deleteEmployee(id).unwrap();
                toast.success("Employee deleted successfully!");
                refetch();
            } catch (error) {
                toast.error("Failed to delete employee.");
            }
        }
    };

    // Table Configuration
    const columns = [
        {
            name: "#",
            selector: (_, index) => (currentPage - 1) * itemsPerPage + index + 1,
            sortable: true,
            width: "70px"
        },
        {
            name: "Full Name",
            selector: (row) => row.fullName,
            sortable: true
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true
        },
        {
            name: "Mobile No",
            selector: (row) => row.mobileNo,
            sortable: true
        },
        {
            name: "Role",
            selector: (row) => row.role,
            sortable: true
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <Link
                        to={`/dashboard/edit-employee/${row._id}`}
                        className="btn btn-sm btn-outline-primary"
                        title="Edit employee"
                    >
                        <i className="fa fa-edit"></i>
                    </Link>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(row._id)}
                        title="Delete employee"
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            ),
            width: "150px"
        }
    ];

    // Loading and Error States
    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger mx-3 mt-3">
                <i className="fa fa-exclamation-circle me-2"></i>
                Failed to load employees. Please try again later.
            </div>
        );
    }

    return (
        <div className="container-fluid py-3">
            <ToastContainer position="top-right" autoClose={3000} />

            {/* Header Section */}
            {/* <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                        <div className="mb-3 mb-md-0">
                            <h5 className="card-title mb-0">
                                <i className="fa fa-users me-2 text-primary"></i>
                                Employee Management
                            </h5>
                            <p className="text-muted small mb-0">
                                Manage your employees
                            </p>
                        </div>
                        <div className="d-flex flex-column flex-md-row gap-3">
                            <Link to="/dashboard/add-employee" className="btn btn-primary">
                                <i className="fa fa-plus me-2"></i> Add Employee
                            </Link>
                            <div className="search-box">
                                <i className="fa fa-search search-icon"></i>
                                <input
                                    type="text"
                                    className="form-control ps-4"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search employees..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                        {/* Left Section - Title & Description */}
                        <div>
                            <h5 className="card-title mb-1 d-flex align-items-center">
                                <i className="fa fa-users me-2 text-primary"></i> Employee Management
                            </h5>
                            <p className="text-muted small mb-0">Manage your employees</p>
                        </div>

                        {/* Right Section - Button & Search Box */}
                        <div className="d-flex flex-column flex-sm-row align-items-center gap-2">
                            <Link to="/dashboard/add-employee" className="btn btn-primary">
                                <i className="fa fa-plus me-2"></i> Add Employee
                            </Link>
                            <div className="position-relative">
                                <i className="fa fa-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"></i>
                                <input
                                    type="text"
                                    className="form-control ps-4"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search employees..."
                                    style={{ minWidth: "250px" }} // Ensures proper width
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Data Table Section */}
            <div className="card border-0 shadow-sm">
                <DataTable
                    columns={columns}
                    data={currentItems}
                    pagination
                    paginationServer
                    paginationTotalRows={filteredEmployees.length}
                    paginationPerPage={itemsPerPage}
                    paginationDefaultPage={currentPage}
                    onChangePage={setCurrentPage}
                    noDataComponent={
                        <div className="text-center py-5">
                            <i className="fa fa-box-open fa-3x text-muted mb-3"></i>
                            <h5>No employees found</h5>
                            <p className="text-muted">
                                {searchTerm ?
                                    "Try a different search term" :
                                    "Add your first employee to get started"}
                            </p>
                        </div>
                    }
                    highlightOnHover
                    pointerOnHover
                />
            </div>
        </div>
    );
};

export default List;
