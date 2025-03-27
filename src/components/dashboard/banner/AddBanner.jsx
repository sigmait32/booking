import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddBannerMutation, useUpdateBannerMutation, useGetBannerByIdQuery } from '../../../store/features/banner/bannerApi';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // 

const BannerForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const [addBanner, { isLoading: isAdding }] = useAddBannerMutation();
    const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();
    const { data: banner, isLoading: isFetching } = useGetBannerByIdQuery(id, { skip: !isEdit });

    useEffect(() => {
        if (isEdit && banner) {
            setTitle(banner.title);
            setDescription(banner.description);
        }
    }, [banner, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) formData.append('image', image);

        try {
            await addBanner(formData).unwrap();
            toast.success('Banner added successfully!');
            // navigate('/dashboard/banner-list');
            setTimeout(() =>{
                navigate('/dashboard/banner-list');
            },1000)
        } catch (error) {
            toast.error('Error saving banner!');
            console.error('Error saving banner:', error);
        }
    };

    if (isEdit && isFetching) return <p className="text-center">Loading banner data...</p>;

    return (
        <Container className="mt-4">
            <ToastContainer />
            <h2 className="text-center mb-4">{isEdit ? 'Edit' : 'Add'} Banner</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isAdding || isUpdating}>
                    {isAdding || isUpdating ? <Spinner animation="border" size="sm" /> : isEdit ? 'Update' : 'Add'} Banner
                </Button>
            </Form>
        </Container>
    );
};

export default BannerForm;