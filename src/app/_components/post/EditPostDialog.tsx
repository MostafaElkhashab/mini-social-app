'use client';
import React, { useRef, useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify';
import cookies from 'js-cookie';
import { PostType } from '../_Interfaces/posts.types';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

type EditPostDialogProps = {
    open: boolean;
    onClose: () => void;
    post: PostType;
    onSuccess: () => void;
};

const EditPostDialog = ({ open, onClose, post, onSuccess }: EditPostDialogProps) => {
    const [body, setBody] = useState(post.body);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(post.image || '');
    const [loading, setLoading] = useState(false);
    const inputFileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setBody(post.body);
            setImagePreview(post.image || '');
            setSelectedImage(null);
        }
    }, [open, post]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const payload = new FormData();
            payload.append("body", body);
            if (selectedImage) {
                payload.append("image", selectedImage);
            }

            await axios.put(
                `https://linked-posts.routemisr.com/posts/${post._id}`,
                payload,
                {
                    headers: {
                        token: cookies.get("token") || ""
                    }
                }
            );

            toast.success("Post updated successfully");
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to update post");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        placeholder="What's on your mind?"
                        variant="outlined"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    {imagePreview && (
                        <Box sx={{ width: '100%', height: 200, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box
                                component="img"
                                src={imagePreview}
                                alt="Post preview"
                                sx={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                    borderRadius: '8px'
                                }}
                            />
                        </Box>
                    )}
                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                    >
                        {selectedImage ? 'Change Image' : 'Upload Image'}
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            ref={inputFileRef}
                        />
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleUpdate} variant="contained" disabled={loading || !body}>
                    {loading ? 'Updating...' : 'Update'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPostDialog;
