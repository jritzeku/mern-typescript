import React, { useState, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getMyPosts, getPosts } from "../redux/actions/PostActions";
import { IPost } from "../interfaces/IPost";
import Post from "../components/Post";
import { Link } from "react-router-dom";

const MyPostsPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getMyPosts())

    }, [dispatch])

    const { loading, myPosts:posts, error } = useSelector((state: RootStateOrAny) => state.postsGetMy)

    return (

        <div className='flex justify-center  overflow-scroll pt-[100px] bg-gray-100 h-screen'>
            <ul
                className='flex flex-col w-[80%]   gap-8 mb-5 overflow-scroll  '>
                <p className='text-[32px] font-bold py-6 text-center' >My Posts</p>

                {
                    loading ? (
                        <p>loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        posts?.map((post: IPost) => (
                            <li className=" ">
                                <Link to={`/postDetails/${post._id}`}>
                                    < Post post={post} />
                                </Link>
                            </li>
                        ))
                    )}
            </ul>
        </div>
    )
}

export default MyPostsPage