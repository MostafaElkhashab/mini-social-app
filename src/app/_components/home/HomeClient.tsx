"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import CakeIcon from '@mui/icons-material/Cake';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CircleIcon from '@mui/icons-material/Circle';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { PostType } from '../../_components/_Interfaces/posts.types';
import Post from '../../_components/post/Post';
import CreatePost from '../../_components/createPost/CreatePost';

type Props = {
    allPosts?: PostType[];
};

export default function HomeClient({ allPosts }: Props) {
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const router = useRouter();

    const handlePostUpdate = () => {
        router.refresh();
    };

    return (
        <>
            <Box component={"section"} sx={{ width: '90%', mx: 'auto' }}>
                <Grid spacing={2} container>
                    <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: showLeft ? 'block' : 'none', md: 'block' } }}>
                        <Box className="fb-left" sx={{ p: 1 }}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <CakeIcon fontSize="small" color="action" />
                                <Typography variant="subtitle1" ml={1}>
                                    Birthdays
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" mb={2}>
                                Today is Khaled's birthday.
                            </Typography>
                            <Divider />
                            <Box display="flex" alignItems="center" justifyContent="space-between" mt={2} mb={1}>
                                <Typography variant="subtitle1">Contacts</Typography>
                                <IconButton size="small">
                                    <SearchIcon fontSize="small" />
                                </IconButton>
                            </Box>
                            <List dense>
                                {[
                                    { name: 'Meta AI', avatar: '' },
                                    { name: 'Abdalla Hamed', avatar: '' },
                                    { name: 'Youssef Mansour', avatar: '' },
                                    { name: 'Mostafa Mohamed', avatar: '' },
                                ].map((c) => (
                                    <ListItem key={c.name}>
                                        <ListItemAvatar>
                                            <Avatar src={c.avatar}>{c.name[0]}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={c.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box>
                            <CreatePost />
                            {allPosts?.map((post) => (
                                <Post key={post._id} postDetails={post} onPostUpdate={handlePostUpdate} />
                            ))}
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: showRight ? 'block' : 'none', md: 'block' } }}>
                        <Box className="fb-right" sx={{ p: 1 }}>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar />
                                    </ListItemAvatar>
                                    <ListItemText primary="Mostafa Elkhashab" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <CircleIcon fontSize="small" color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary="Meta AI" />
                                </ListItem>
                                <Divider sx={{ my: 1 }} />
                                <ListItem>
                                    <ListItemIcon>
                                        <GroupIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Friends" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <StorefrontIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Marketplace" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <HistoryIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Memories" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <BookmarkIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Saved" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <GroupIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Groups" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <MoreHorizIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="See more" />
                                </ListItem>
                            </List>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="subtitle2" gutterBottom>
                                Your shortcuts
                            </Typography>
                            <List dense>
                                {['out of context', 'BlackShot SEA', '8 Ball Pool'].map((s) => (
                                    <ListItem key={s}>
                                        <ListItemAvatar>
                                            <Avatar>{s[0]}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={s} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* fixed bottom bar for mobile */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '95%',
                    maxWidth: 680,
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                    borderRadius: 3,
                    display: { xs: 'flex', md: 'none' },
                    justifyContent: 'space-around',
                    p: 1,
                    zIndex: 1300,
                }}
            >
                <IconButton
                    color={showLeft ? 'primary' : 'default'}
                    onClick={() => setShowLeft((s) => !s)}
                >
                    <MenuIcon />
                </IconButton>

                <Button variant="contained" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Create
                </Button>

                <IconButton
                    color={showRight ? 'primary' : 'default'}
                    onClick={() => setShowRight((s) => !s)}
                >
                    <NotificationsIcon />
                </IconButton>
            </Box>
        </>
    );
}
