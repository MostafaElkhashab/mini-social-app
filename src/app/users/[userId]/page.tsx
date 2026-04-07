import { cookies } from 'next/headers';
import ProfileClient from '@/app/_components/profile/ProfileClient';
import { notFound } from 'next/navigation';

type Props = {
    params: { userId: string } | Promise<{ userId: string }>;
};

const UserProfilePage = async ({ params }: Props) => {
    const cookie = await cookies();
    const resolvedParams = await params;
    const userId = resolvedParams.userId;
    
    let userData = null;
    let posts = [];

    try {
        const res = await fetch(
            `https://linked-posts.routemisr.com/users/${userId}/profile-data`,
            {
                headers: {
                    token: cookie.get("token")?.value || ""
                }
            }
        );
        
        if (!res.ok) {
            if (res.status === 404) {
                notFound();
            }
            throw new Error('Failed to fetch user data');
        }
        
        const data = await res.json();
        userData = data.user || data;
        
        if (userData?._id) {
            const postsRes = await fetch(
                `https://linked-posts.routemisr.com/users/${userId}/posts?limit=50`,
                {
                    headers: {
                        token: cookie.get("token")?.value || ""
                    }
                }
            );
            const postsData = await postsRes.json();
            posts = postsData.posts || [];
        }
    } catch (error) {
        console.error("Failed to load user profile:", error);
        notFound();
    }

    if (!userData) {
        notFound();
    }

    return (
        <ProfileClient userId={userId} initialUserData={userData} initialPosts={posts} />
    );
}

export default UserProfilePage;
