'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { PostType } from '../_Interfaces/posts.types';
import Image from 'next/image';
import SendIcon from '@mui/icons-material/Send';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Comments from './../comments/Comments';
import EditPostDialog from './EditPostDialog';
import DeletePostDialog from './DeletePostDialog';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import cookies from 'js-cookie';
import Link from 'next/link';


// !! => operator da by7wl el value l boolean 3shan y3rf y3ml render wala la2
// !!postDetails.image => lw fe image y3ml render l CardMedia lw mafeesh y3ml render w y5leha empty
//say?.() => lw fe function say y3ml call lw mafeesh y5leha Undefiend w ma3mlsh call
// optional chaining => ?. => by5leek t3ml access l property aw method lw mafeesh y5leha Undefiend w ma3mlsh call
// بتبقى ف الفانكشنز وال   arrays aw objects

type PostProps = {
    postDetails: PostType
    hasMoreComments?: boolean
    onPostUpdate?: () => void;
    onPostDelete?: () => void;
}

const Post = ({ postDetails, hasMoreComments = false, onPostUpdate, onPostDelete }: PostProps) => {
    const hasComments = !!postDetails.comments[0];
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [commentText, setCommentText] = React.useState('');
    const [commentLoading, setCommentLoading] = React.useState(false);
    const router = useRouter();
    const open = Boolean(anchorEl);

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
        if (onPostUpdate) {
            onPostUpdate();
        } else {
            router.refresh();
        }
    };

    const handleDeleteSuccess = () => {
        if (onPostDelete) {
            onPostDelete();
        } else if (onPostUpdate) {
            onPostUpdate();
        } else {
            router.refresh();
        }
    };

    const handleCommentSubmit = async () => {
        if (!commentText.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }

        setCommentLoading(true);
        try {
            await axios.post(
                'https://linked-posts.routemisr.com/comments',
                {
                    content: commentText,
                    post: postDetails._id
                },
                {
                    headers: {
                        token: cookies.get("token") || ""
                    }
                }
            );

            toast.success("Comment added successfully");
            setCommentText('');
            if (onPostUpdate) {
                onPostUpdate();
            } else {
                router.refresh();
            }
        } catch (error) {
            toast.error("Failed to add comment");
            console.error(error);
        } finally {
            setCommentLoading(false);
        }
    };

    const handleCommentKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleCommentSubmit();
        }
    };

    return (
        <Card className="fb-post-card" sx={{ width: '100%' }}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        <Image src={postDetails.user.photo} alt={postDetails.user.name} width={40} height={40} />
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
                        href={`/profile/${postDetails.user._id}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        {postDetails.user.name}
                    </Link>
                }
                subheader={postDetails.createdAt}
            />
            {!!postDetails.image && <CardMedia
                component="img"
                height="194"
                image={postDetails.image}
                alt="Paella dish"
            />}


            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {postDetails.body}
                </Typography>
            </CardContent>
            <OutlinedInput
                fullWidth
                placeholder='Comment...'
                id="outlined-adornment-Comment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={handleCommentKeyPress}
                disabled={commentLoading}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleCommentSubmit}
                            disabled={commentLoading || !commentText.trim()}
                            edge="end"
                            aria-label="send comment"
                        >
                            <SendIcon />
                        </IconButton>
                    </InputAdornment>
                }
                aria-describedby="outlined-Comment-helper-text"
                inputProps={{
                    'aria-label': 'Comment',
                }}
            />
            <CardActions sx={{ display: "flex", justifyContent: "space-around" }} >
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="comment">
                    <CommentIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>

            </CardActions>

            {hasComments && (
                <Comments
                    postDetails={postDetails}
                    displayAllComments={hasMoreComments}
                    onCommentUpdate={onPostUpdate || (() => router.refresh())}
                />
            )}

            <EditPostDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                post={postDetails}
                onSuccess={handleUpdateSuccess}
            />
            <DeletePostDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                post={postDetails}
                onSuccess={handleDeleteSuccess}
            />
        </Card>
    );
}
export default Post;