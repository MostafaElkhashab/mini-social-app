'use client';
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Image from 'next/image'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import staticImg from '@images/cbd0b1a6345a44b58dda0f6a355eb39ce4e8a56a.png'
import { CommentType, PostType } from '../_Interfaces/posts.types';
import Link from 'next/link';
import EditCommentDialog from './EditCommentDialog';
import DeleteCommentDialog from './DeleteCommentDialog';

type CommentsProps = {
    postDetails: PostType;
    displayAllComments?: boolean;
    onCommentUpdate?: () => void;
};

const Comments = ({ postDetails, displayAllComments, onCommentUpdate }: CommentsProps) => {
    const hasMoreComments = postDetails.comments?.length > 1;
    return (
        <>
            <Box component={"div"}>
                {displayAllComments && postDetails.comments.map((comment) => (
                    <SingleComment 
                        key={comment._id} 
                        Comment={comment} 
                        onCommentUpdate={onCommentUpdate}
                    />
                ))}
                {!displayAllComments && postDetails.comments?.[0] && (
                    <SingleComment 
                        Comment={postDetails.comments[0]} 
                        onCommentUpdate={onCommentUpdate}
                    />
                )}

                <CardContent sx={{ pt: "0" }}>

                    <Link href={`/posts/${postDetails._id}`} style={{ textDecoration: "none", color: "blue" }}>
                        {hasMoreComments && !displayAllComments && <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            View all comments
                        </Typography>}
                    </Link>
                </CardContent>
            </Box>
        </>
    )
}

export default Comments

type SingleCommentProps = {
    Comment: CommentType;
    onCommentUpdate?: () => void;
};

function SingleComment({ Comment, onCommentUpdate }: SingleCommentProps) {
    const firstComment = Comment;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const open = Boolean(anchorEl);

    function getUserPhoto(imgSrc: string) {
        const pathSegmants = imgSrc.split("/");
        const lastSegmant = pathSegmants[pathSegmants.length - 1];
        if (!imgSrc) { return staticImg }
        if (lastSegmant === "undefined") { return staticImg }
        return lastSegmant;
    }

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEditClick = () => {
        setEditDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleUpdateSuccess = () => {
        if (onCommentUpdate) {
            onCommentUpdate();
        }
    };

    const handleDeleteSuccess = () => {
        if (onCommentUpdate) {
            onCommentUpdate();
        }
    };

    return <>
        <CardHeader
            avatar={
                <Avatar sx={{ width: 40, height: 40 }} aria-label="recipe">
                    <Image src={getUserPhoto(firstComment.commentCreator.photo)} alt={firstComment.commentCreator.name} style={{ width: "100%", height: "100%" }} />
                </Avatar>
            }
            action={
                <>
                    <IconButton 
                        aria-label="settings"
                        onClick={handleMenuClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleEditClick}>
                            <ListItemIcon>
                                <EditIcon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Edit</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleDeleteClick}>
                            <ListItemIcon>
                                <DeleteIcon fontSize="small" color="error" />
                            </ListItemIcon>
                            <ListItemText>Delete</ListItemText>
                        </MenuItem>
                    </Menu>
                </>
            }
            title={
                <Link 
                    href={`/profile/${firstComment.commentCreator._id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    {firstComment.commentCreator.name}
                </Link>
            }
            subheader={firstComment.createdAt}
        />

        <CardContent sx={{ pb: "0" }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {firstComment.content}
            </Typography>
        </CardContent>

        <EditCommentDialog
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            comment={firstComment}
            onSuccess={handleUpdateSuccess}
        />
        <DeleteCommentDialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            comment={firstComment}
            onSuccess={handleDeleteSuccess}
        />
    </>
}