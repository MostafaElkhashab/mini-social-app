import { cookies } from 'next/headers';
import ProfileClient from '@/app/_components/profile/ProfileClient';
import { notFound } from 'next/navigation';

type Props = {
    params: { id: string } | Promise<{ id: string }>;
};

const UserProfilePage = async ({ params }: Props) => {
    const cookie = await cookies();
    const resolvedParams = await params;
    const userId = resolvedParams.id;

    let userData = null;
    let posts = [];

    // Fetch user data
    try {
        const res = await fetch(
            `https://linked-posts.routemisr.com/users/${userId}/profile-data`,
            {
                headers: {
                    token: cookie.get("token")?.value || ""
                },
                cache: 'no-store'
            }
        );

        if (res.status === 404) {
            notFound();
        }

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.error("Failed to fetch user data:", res.status, errorData);
            // Don't throw, let ProfileClient handle the error state
        } else {
            const data = await res.json();
            userData = data.user || data || null;
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        // Don't call notFound() here, let ProfileClient handle empty state
    }

    // Fetch user posts (this can fail independently)
    if (userData?._id || userId) {
        try {
            const postsRes = await fetch(
                `https://linked-posts.routemisr.com/users/${userId}/posts?limit=50`,
                {
                    headers: {
                        token: cookie.get("token")?.value || ""
                    },
                    cache: 'no-store'
                }
            );

            if (postsRes.ok) {
                const postsData = await postsRes.json();
                posts = postsData.posts || postsData || [];
            } else {
                console.error("Failed to fetch posts:", postsRes.status);
                posts = []; // Default to empty array
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            posts = []; // Default to empty array
        }
    }

    // Only call notFound if we have no user data and it was a 404
    // Otherwise, let ProfileClient render with null/empty data and handle the error state
    return (
        <ProfileClient userId={userId} initialUserData={userData} initialPosts={posts} />
    );
}

export default UserProfilePage;
