

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { useGetCategoryQuery, useUpdateCategoryMutation } from '../../../store/features/category/categoryApi';
// import { use, useGetCategoryByIdQuery } from '../../../store/features/category/categoryApi';
import { useGetLogoByIdQuery, useUpdateLogoMutation } from '../../../store/features/logo/logoApi';
import { Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from "../../../utils/imageConfig";


const EditLogoForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch existing category data
    const { data: category, isLoading: isFetching, isError: isFetchError, error: fetchError } = useGetLogoByIdQuery(id);

    // State for form fields
    const [prevImg, setPrevImg] = useState(null);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);

    // Update category mutation
    const [updateCategory, { isLoading: isUpdating, isError: isUpdateError, error: updateError }] = useUpdateLogoMutation();

    // Pre-fill form data when category is fetched
    useEffect(() => {
        if (category) {
            setName(category.name);
            if (category.image) {
                setPrevImg(`${BASE_URL}${category.image}`)
                setImage(category.image)
            }
        }
    }, [category]);

    const handleImageChange = (event) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setImage(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPrevImg(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleRemoveImage = () => {
        setPrevImg(null);
        setImage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();



        // const formData = new FormData();
        // formData.append('name', name);


        const formData = new FormData();
        formData.append('name', name);
        // console.log("formData ", formData)
        if (image) formData.append('image', image);

        try {
            const response = await updateCategory({ id, formData }).unwrap();
            console.log("response is ======>", response)
            toast.success('Category updated successfully!');

            setTimeout(() => {
                navigate('/dashboard/logo-list');
            }, 1000);
        } catch (error) {
            console.log("error is =======>", error.data.error)
            toast.error(error.data.error || 'Error updating category!');
            console.error('Error updating category:', error);
        }
    };

    if (isFetching) {
        return <Spinner animation="border" role="status" />;
    }

    if (isFetchError) {
        return <div className="alert alert-danger">Error fetching category: {fetchError?.data?.message || 'Unknown error'}</div>;
    }

    return (
        <div className="container">
            <ToastContainer />
            <h5 className="mb-4">Edit Category</h5>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row row-cols-1">
                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Featured Image</h6>
                                        <p className="text-secondary">
                                            Upload your image here <br /> Image size should not be more than 2 MB
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="file-uploader">
                                                <label className="w-100">
                                                    <div
                                                        className="border border-2 text-center p-3"
                                                        style={{
                                                            '--bs-border-style': 'dashed',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <svg
                                                            className="text-body-tertiary m-3"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="41px"
                                                            height="30px"
                                                            viewBox="0 0 40.909 30"
                                                        >
                                                            <g transform="translate(0 -73.091)">
                                                                <path
                                                                    data-name="Path 2125"
                                                                    d="M39.129,89.827A8.064,8.064,0,0,0,34.58,86.94,5.446,5.446,0,0,0,30,78.546a5.207,5.207,0,0,0-3.537,1.321,10.921,10.921,0,0,0-10.1-6.776,10.511,10.511,0,0,0-7.713,3.2A10.508,10.508,0,0,0,5.454,84q0,.277.043.916A9.528,9.528,0,0,0,0,93.546a9.193,9.193,0,0,0,2.8,6.743,9.191,9.191,0,0,0,6.744,2.8H32.728a8.172,8.172,0,0,0,6.4-13.264Zm-12.06-.575a.656.656,0,0,1-.479.2H21.818v7.5a.691.691,0,0,1-.681.681H17.045a.691.691,0,0,1-.682-.681v-7.5H11.59a.655.655,0,0,1-.681-.681.8.8,0,0,1,.213-.512L18.6,80.783a.722.722,0,0,1,.98,0l7.5,7.5a.663.663,0,0,1,.191.49A.656.656,0,0,1,27.07,89.252Z"
                                                                    fill="currentColor"
                                                                />
                                                            </g>
                                                        </svg>
                                                        <p style={{ fontSize: '14px' }}>
                                                            <span className="text-color-1 fw-medium">Upload an image</span> or drag and drop <br /> PNG, JPG
                                                        </p>
                                                        <input
                                                            className="form-control"
                                                            type="file"
                                                            name="file"
                                                            hidden
                                                            onChange={handleImageChange}
                                                        />
                                                    </div>
                                                    <br />
                                                </label>

                                                {prevImg && (
                                                    <>
                                                        <img
                                                            src={prevImg}
                                                            alt="Preview"
                                                            style={{ width: '100px', height: '100px' }}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={handleRemoveImage}
                                                            className="btn btn-outline-primary"
                                                            style={{
                                                                padding: '.25rem .5rem',
                                                                fontSize: '.75rem',
                                                                margin: '10px',
                                                            }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="py-4 border-top">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <div>
                                        <h6>Category </h6>
                                        <p className="text-secondary">
                                            Edit your product category and necessary information from here
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card border-0 p-3 shadow-sm">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-12">
                                                    <label className="form-label fw-medium">Category Name *</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        placeholder="Name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col sticky-bottom">
                        <div className="mt-4 bg-gray-1 py-3 border-top border-primary">
                            <div className="row">
                                <div className="col-auto">
                                    <a className="btn btn-outline-primary btn-lg fw-semibold" href="#">
                                        Back
                                    </a>
                                </div>
                                <div className="col-auto ms-auto">
                                    <button className="btn btn-primary btn-lg fw-semibold" type="submit" disabled={isUpdating}>
                                        {isUpdating ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Update'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {isUpdateError && (
                <div className="alert alert-danger mt-3" role="alert">
                    {updateError?.data?.message || 'An error occurred while updating the category.'}
                </div>
            )}
        </div>
    );
};

export default EditLogoForm;
