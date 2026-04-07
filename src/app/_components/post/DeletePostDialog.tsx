'use client';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { toast } from 'react-toastify';
import cookies from 'js-cookie';
import { PostType } from '../_Interfaces/posts.types';

type DeletePostDialogProps = {
    open: boolean;
    onClose: () => void;
    post: PostType;
    onSuccess: () => void;
};

const DeletePostDialog = ({ open, onClose, post, onSuccess }: DeletePostDialogProps) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(
                `https://linked-posts.routemisr.com/posts/${post._id}`,
                {
                    headers: {
                        token: cookies.get("token") || ""
                    }
                }
            );

            toast.success("Post deleted successfully");
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to delete post");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete this post? This action cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button 
                    onClick={handleDelete} 
                    variant="contained" 
                    color="error" 
                    disabled={loading}
                >
                    {loading ? 'Deleting...' : 'Delete'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeletePostDialog;
