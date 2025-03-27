import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


// import { fetchPosts, addPost, editPost, deletePost } from '../../features/posts/postsSlice';
import { fetchPosts, addPost, editPost, deletePost } from '../../../store/features/post/postSlice';

function Post() {
    const dispatch = useDispatch();
    const { posts, status, error } = useSelector((state) => state.posts);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts());
        }
    }, [status, dispatch]);

    const handleAddPost = () => {
        if (title && content) {
            dispatch(addPost({ id: Date.now(), title, content }));
            toast.success('Post added successfully!', { position: 'top-right' });
            setTitle('');
            setContent('');
        } else {
            toast.error('Please fill in both title and content!', { position: 'top-right' });
        }
    };

    const handleEditPost = (id) => {
        const post = posts.find((p) => p.id === id);
        if (post) {
            setTitle(post.title);
            setContent(post.content);
            setEditingId(id);
        }
    };

    const handleSaveEdit = () => {
        if (title && content) {
            dispatch(editPost({ id: editingId, title, content }));
            toast.info('Post updated successfully!', { position: 'top-right' });
            setTitle('');
            setContent('');
            setEditingId(null);
        } else {
            toast.error('Please fill in both title and content!', { position: 'top-right' });
        }
    };

    const handleDeletePost = (id) => {
        dispatch(deletePost(id));
        toast.warning('Post deleted successfully!', { position: 'top-right' });
    };

    return (
        <div className="container my-5">
            {/* Toast Container for notifications */}


            <div className="row">
                <div className="col-12">
                    <h1 className="text-center mb-4">Post Manager</h1>
                </div>
            </div>

            {status === 'loading' && <p className="text-center text-info">Loading posts...</p>}
            {status === 'failed' && <p className="text-center text-danger">Error: {error}</p>}

            <div className="row mb-4">
                <div className="col-md-6 offset-md-3">
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Post Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="form-control mb-3"
                        placeholder="Post Content"
                        rows="4"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    {editingId ? (
                        <button className="btn btn-primary w-100" onClick={handleSaveEdit}>
                            Save Changes
                        </button>
                    ) : (
                        <button className="btn btn-success w-100" onClick={handleAddPost}>
                            Add Post
                        </button>
                    )}
                </div>
            </div>

            <div className="row">
                {posts.map((post) => (
                    <div key={post.id} className="col-md-6 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.content}</p>
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => handleEditPost(post.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => handleDeletePost(post.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Post;
