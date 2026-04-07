'use client'
import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import cookies from 'js-cookie';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import { toast } from 'react-toastify';
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
const CreatePost = () => {
    const inputTextRef = useRef<HTMLInputElement>(null)
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    async function CreateFbPost() {
        setLoading(true)
        const payload = new FormData()
        payload.append("body", inputTextRef.current?.value ?? "")
        payload.append("image", inputFileRef.current?.files?.[0] ?? "")
        await axios.post("https://linked-posts.routemisr.com/posts", payload, {
            headers: {
                token: cookies.get("token") || ""
            }
        }).then(res => {
            console.log(res.data)
            toast.success("Post created successfully")
        }).catch(err => {
            toast.error("Failed to create post")
        })
        setLoading(false)
    }
    return (
        <>
            <Box
                sx={{
                    border: 1,
                    borderColor: 'grey.300',
                    borderRadius: 2,
                    p: 2,
                    mb: 3,
                    bgcolor: 'background.paper',
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            inputRef={inputTextRef}
                            fullWidth
                            multiline
                            minRows={3}
                            placeholder="What's on your mind?"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Button
                            fullWidth
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={(event) => console.log(event.target.files)}
                                multiple
                                ref={inputFileRef}
                            />
                        </Button>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>

                        <Button onClick={CreateFbPost} disabled={loading ? true : false} variant="contained" color="primary" fullWidth>
                            Post
                        </Button>
                        {/* <Button onClick={CreateFbPost} variant="contained" color="primary" fullWidth>
                            Post
                        </Button> */}
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default CreatePost