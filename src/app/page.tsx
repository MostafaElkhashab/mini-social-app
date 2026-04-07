
import { cookies } from 'next/headers';
import { PostType } from './_components/_Interfaces/posts.types';
import HomeClient from './_components/home/HomeClient';
export default async function Home() {
  const myCookies = await cookies();
  // async function getAllPosts() {
  //   const res = await fetch("https://linked-posts.routemisr.com/posts?limit=50", {
  //     headers: {
  //       token: myCookies.get("token")?.value || "",
  //     },
  //   })
  //   const result = await res.json();
  //   return result.posts;
  // }
  // const allPosts: PostType[] = await getAllPosts()
  // console.log("loooog", allPosts[0].comments)
  return (
    <>
      <HomeClient />
    </>
  );
}
