'use client';
import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import { toast } from 'react-toastify';
import cookies from 'js-cookie';
import { CommentType } from '../_Interfaces/posts.types';

type EditCommentDialogProps = {
    open: boolean;
    onClose: () => void;
    comment: CommentType;
    onSuccess: () => void;
};

const EditCommentDialog = ({ open, onClose, comment, onSuccess }: EditCommentDialogProps) => {
    const [content, setContent] = useState(comment.content);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            setContent(comment.content);
        }
    }, [open, comment]);

    const handleUpdate = async () => {
        if (!content.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }

        setLoading(true);
        try {
            await axios.put(
                `https://linked-posts.routemisr.com/comments/${comment._id}`,
                { content },
                {
                    headers: {
                        token: cookies.get("token") || ""
                    }
                }
            );

            toast.success("Comment updated successfully");
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to update comment");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        placeholder="Edit your comment..."
                        variant="outlined"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button onClick={handleUpdate} variant="contained" disabled={loading || !content.trim()}>
                    {loading ? 'Updating...' : 'Update'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditCommentDialog;
