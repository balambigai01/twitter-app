import Post from "./Post.jsx";
import PostSkeleton from "../skeletons/PostSkeleton.jsx";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Posts = ({ feedType, username, userId }) => {
    const getPostEndPoint = () => {
        switch (feedType) {
            case "forYou":
                return "/api/posts/all";
            case "following":
                return "/api/posts/following";
            case "posts":
                return `/api/posts/user/${username}`; 
            case "likes":
                return `/api/posts/likes/${userId}`;
            default:
                return "/api/posts/all";
        }
    };

    const POST_ENDPOINT = getPostEndPoint();

    const { data: posts, isLoading, refetch, isRefetching, error } = useQuery({
        queryKey: ["posts", feedType, username, userId],
        queryFn: async () => {
            try {
                console.log("Fetching from:", POST_ENDPOINT);
                const res = await fetch(POST_ENDPOINT);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                console.log("Data fetched:", data); // Log the fetched data
                return data;
            } catch (error) {
                console.error("Error fetching posts:", error);
                throw error;
            }
        },
        keepPreviousData: true,
    });

    useEffect(() => {
        refetch();
    }, [feedType, username, userId, refetch]);

    return (
        <>
            {(isLoading || isRefetching) && (
                <div className='flex flex-col justify-center'>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            )}
            {!isLoading && !isRefetching && posts?.length === 0 && (
                <p className='text-center my-4'>No posts in this tab. Switch 👻</p>
            )}
            {!isLoading && !isRefetching && posts?.length > 0 && (
                <div>
                    {posts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </div>
            )}
            {!isLoading && !isRefetching && error && (
                <p className='text-center my-4 text-red-500'>Error: {error.message}</p>
            )}
        </>
    );
};

export default Posts;
