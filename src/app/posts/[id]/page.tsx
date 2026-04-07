import { PostType } from '@/app/_components/_Interfaces/posts.types'
import PostDetailsClient from './PostDetailsClient';
import Box from '@mui/material/Box';
import { cookies } from 'next/headers'
import React from 'react'
type Props = {
    params: { id: string } | Promise<{ id: string }>;
};

const PostDetails = async ({ params }: Props) => {
    const cookie = await cookies()
    const resolvedParams = await params
    const id = resolvedParams.id
    async function getSinglePost() {
        const res = await fetch(`https://linked-posts.routemisr.com/posts/${id}`, {
            headers: {
                token: cookie.get("token")?.value || ""
            }
        })
        const result = await res.json().then((res) => res).catch((err) => err);
        return result.post;
    }
    const singlePost: PostType = await getSinglePost()
    return (
        <>
            <Box component={"section"} sx={{
                width: { xs: "90%", sm: "70%", md: "50%" },
                mx: "auto",
                mt: { xs: "30px", sm: "30px", md: "30px" },
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "10px 10px 30px rgba(0,0,0,0.1) , -10px -10px 30px rgba(0,0,0,0.1) "
            }}>
                <PostDetailsClient post={singlePost} />

            </Box>
        </>
    )
}

export default PostDetails