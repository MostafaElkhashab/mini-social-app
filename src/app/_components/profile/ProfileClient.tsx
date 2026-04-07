'use client';
import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { toast } from 'react-toastify';
import cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '@/lib/redux/authSlice';
import { StoreType } from '@/lib/redux/reduxStore';
import { PostType } from '../_Interfaces/posts.types';
import Post from '../post/Post';
import ChangePasswordDialog from './ChangePasswordDialog';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const CoverPhotoBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 350,
    backgroundColor: theme.palette.grey[300],
    position: 'relative',
    borderRadius: '8px 8px 0 0',
    overflow: 'hidden',
}));

const ProfilePhotoBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    bottom: -75,
    left: 20,
    border: '4px solid white',
    borderRadius: '50%',
    width: 150,
    height: 150,
    backgroundColor: theme.palette.grey[200],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

type ProfileClientProps = {
    userId?: string;
    initialUserData?: any;
    initialPosts?: PostType[];
};

const ProfileClient = ({ userId, initialUserData, initialPosts }: ProfileClientProps) => {
    const [userData, setLocalUserData] = useState(initialUserData);
    const [posts, setPosts] = useState<PostType[]>(initialPosts || []);
    const [loading, setLoading] = useState(false);
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);
    const [photoUploading, setPhotoUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const coverPhotoInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const reduxUserData = useSelector((state: StoreType) => state.auth.userData);
    const isOwnProfile = !userId || userId === userData?._id;

    useEffect(() => {
        if (initialUserData) {
            setLocalUserData(initialUserData);
            if (isOwnProfile) {
                dispatch(setUserData(initialUserData));
            }
        } else if (userId || !initialUserData) {
            // If no initial data, try to fetch it
            fetchUserData();
        }
    }, [initialUserData, dispatch, isOwnProfile, userId]);

    useEffect(() => {
        if (initialPosts && initialPosts.length > 0) {
            setPosts(initialPosts);
        } else if ((userId || userData?._id) && (!initialPosts || initialPosts.length === 0)) {
            // If no initial posts, try to fetch them
            fetchUserPosts();
        }
    }, [initialPosts, userId, userData?._id]);

    const fetchUserData = async () => {
        try {
            const endpoint = userId
                ? `https://linked-posts.routemisr.com/users/${userId}/profile-data`
                : 'https://linked-posts.routemisr.com/users/profile-data';

            const res = await axios.get(endpoint, {
                headers: {
                    token: cookies.get("token") || ""
                }
            });
            const data = res.data.user || res.data;
            setLocalUserData(data);
            if (isOwnProfile) {
                dispatch(setUserData(data));
            }
        } catch (error) {
            toast.error("Failed to load user data");
            console.error(error);
        }
    };

    const fetchUserPosts = async () => {
        try {
            const targetUserId = userId || userData?._id;
            if (!targetUserId) return;

            const res = await axios.get(
                `https://linked-posts.routemisr.com/users/${targetUserId}/posts?limit=50`,
                {
                    headers: {
                        token: cookies.get("token") || ""
                    }
                }
            );
            setPosts(res.data.posts || []);
        } catch (error) {
            toast.error("Failed to load posts");
            console.error(error);
        }
    };

    const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setPhotoUploading(true);
        try {
            const formData = new FormData();
            formData.append('photo', file);

            await axios.put(
                'https://linked-posts.routemisr.com/users/upload-photo',
                formData,
                {
                    headers: {
                        token: cookies.get("token") || "",
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            toast.success("Photo uploaded successfully");
            await fetchUserData();
        } catch (error) {
            toast.error("Failed to upload photo");
            console.error(error);
        } finally {
            setPhotoUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handlePostUpdate = () => {
        fetchUserPosts();
    };

    return (
        <Box sx={{ pt: 8, pb: 4, minHeight: '100vh', backgroundColor: 'grey.100' }}>
            <Container maxWidth="lg">
                <Card sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
                    {/* Cover Photo */}
                    <CoverPhotoBox>
                        {userData?.coverPhoto ? (
                            <Image
                                src={userData.coverPhoto}
                                alt="Cover"
                                fill
                                style={{ objectFit: 'cover' }}
                                unoptimized
                            />
                        ) : (
                            <Box sx={{ width: '100%', height: '100%', backgroundColor: 'grey.300' }} />
                        )}
                        {isOwnProfile && (
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    bottom: 16,
                                    right: 16,
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                    color: 'white',
                                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
                                }}
                                onClick={() => coverPhotoInputRef.current?.click()}
                            >
                                <CameraAltIcon />
                            </IconButton>
                        )}
                        <input
                            ref={coverPhotoInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handlePhotoUpload}
                        />
                    </CoverPhotoBox>

                    {/* Profile Photo and Info */}
                    <Box sx={{ position: 'relative', pt: 10, px: 3, pb: 3 }}>
                        <ProfilePhotoBox>
                            {userData?.photo ? (
                                <Image
                                    src={userData.photo}
                                    alt={userData.name}
                                    width={150}
                                    height={150}
                                    style={{ borderRadius: '50%' }}
                                />
                            ) : (
                                <Avatar sx={{ width: 150, height: 150 }} />
                            )}
                            {isOwnProfile && (
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                        '&:hover': { backgroundColor: 'primary.dark' }
                                    }}
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={photoUploading}
                                >
                                    <CameraAltIcon />
                                </IconButton>
                            )}
                        </ProfilePhotoBox>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handlePhotoUpload}
                        />

                        <Box sx={{ ml: 20, mt: 2 }}>
                            <Typography variant="h4" fontWeight="bold">
                                {userData?.name || 'Loading...'}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {userData?.email || ''}
                            </Typography>
                            {isOwnProfile && (
                                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<EditIcon />}
                                        onClick={() => router.push(`/profile/${userData._id}`)}
                                    >
                                        Edit Profile
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<LockIcon />}
                                        onClick={() => setChangePasswordOpen(true)}
                                    >
                                        Change Password
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Card>

                {/* Posts Section */}
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Box>
                            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Posts
                            </Typography>
                            {!userData ? (
                                <Card>
                                    <CardContent>
                                        <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
                                            Loading user data...
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ) : posts.length === 0 ? (
                                <Card>
                                    <CardContent>
                                        <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
                                            No posts yet
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ) : (
                                posts.map((post) => (
                                    <Box key={post._id} sx={{ mb: 2 }}>
                                        <Post
                                            postDetails={post}
                                            hasMoreComments={false}
                                            onPostUpdate={handlePostUpdate}
                                        />
                                    </Box>
                                ))
                            )}
                        </Box>
                    </Grid>

                    {/* Sidebar */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                                    About
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography variant="body2" color="text.secondary">
                                    {userData?.bio || 'No bio available'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <ChangePasswordDialog
                    open={changePasswordOpen}
                    onClose={() => setChangePasswordOpen(false)}
                />
            </Container>
        </Box>
    );
};

export default ProfileClient;
