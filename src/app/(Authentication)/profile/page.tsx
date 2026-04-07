import { cookies } from 'next/headers';
import ProfileClient from '@/app/_components/profile/ProfileClient';
import { redirect } from 'next/navigation';

const ProfilePage = async () => {
    const cookie = await cookies();
    let userData = null;

    try {
        const res = await fetch('https://linked-posts.routemisr.com/users/profile-data', {
            headers: {
                token: cookie.get("token")?.value || ""
            }
        });
        const data = await res.json();
        userData = data.user || data;
        
        // Redirect to the dynamic profile route with user ID
        if (userData?._id) {
            redirect(`/profile/${userData._id}`);
        }
    } catch (error) {
        console.error("Failed to load profile data:", error);
    }

    // If no user data, show the client component which will handle loading
    return (
        <ProfileClient initialUserData={userData} initialPosts={[]} />
    );
}

export default ProfilePage
