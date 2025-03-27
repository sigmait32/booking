
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateBannerMutation, useGetBannerByIdQuery } from '../../../store/features/banner/bannerApi';
import { Form, Button, Container, Spinner, Card, Image } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // 
import BASE_URL from '../../../utils/imageConfig';

const UpdateBanner = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const { data: banner, isLoading: isFetching } = useGetBannerByIdQuery(id);
    const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();

    // Set form values when banner data is available
    useEffect(() => {
        if (banner) {
            setTitle(banner.title);
            setDescription(banner.description);
            setImagePreview(`${BASE_URL}/${banner.image}`);
        }
    }, [banner]);

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Handle image removal
    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image) formData.append('image', image);

        try {
            const response = await updateBanner({ id, formData }).unwrap();
            console.log("Success Response:", response);
            toast.success(response?.message || 'Banner updated successfully!');
            setTimeout(() => {
                navigate('/dashboard/banner-list');
            }, 1000)

        } catch (error) {
            console.error("Error updating banner:", error);
            toast.error(error?.data?.error || 'Error updating banner!');
        }
    };

    if (isFetching) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p>Loading banner data...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <ToastContainer />
            <h2 className="text-center mb-4">Update Banner</h2>
            <Card className="p-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="Enter title"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Enter description"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        {imagePreview && (
                            <div className="mt-3 position-relative">
                                <Image
                                    src={imagePreview}
                                    alt="Banner Preview"
                                    className="img-thumbnail"
                                    style={{ maxWidth: '200px' }}
                                />
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="position-absolute top-0 start-0 translate-middle"
                                    onClick={handleRemoveImage}
                                    style={{ borderRadius: '50%' }}
                                >
                                    &times;
                                </Button>
                            </div>
                        )}
                    </Form.Group>
                    <div className="d-flex gap-2">
                        <Button variant="primary" type="submit" disabled={isUpdating}>
                            {isUpdating ? (
                                <Spinner animation="border" size="sm" />
                            ) : (
                                'Update Banner'
                            )}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate('/dashboard/banner-list')}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
};

export default UpdateBanner;

