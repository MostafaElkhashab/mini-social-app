'use client';
import { PostType } from '@/app/_components/_Interfaces/posts.types';
import Post from '@/app/_components/post/Post';
import { useRouter } from 'next/navigation';

type PostDetailsClientProps = {
    post: PostType;
};

const PostDetailsClient = ({ post }: PostDetailsClientProps) => {
    const router = useRouter();

    const handlePostUpdate = () => {
        router.refresh();
    };

    const handlePostDelete = () => {
        router.push('/');
    };

    return (
        <Post 
            postDetails={post} 
            hasMoreComments 
            onPostUpdate={handlePostUpdate}
            onPostDelete={handlePostDelete}
        />
    );
};

export default PostDetailsClient;
