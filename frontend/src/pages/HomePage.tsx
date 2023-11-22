import React, { useState, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/actions/PostActions";
import { IPost } from "../interfaces/IPost";
import Post from "../components/Post";
import { Link } from "react-router-dom";

const HomePage = () => {

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getPosts())

    }, [dispatch])

    const { loading, posts, error } = useSelector((state: RootStateOrAny) => state.postsGet)


 
    console.log('posts:', posts)
    console.log('error:', error)
    console.log('loading:', loading)

    return (

        <div className='flex justify-center items-center overflow-scroll pt-[100px] bg-gray-100 h-screen'>

            <ul
                className='flex flex-col w-[80%]   gap-8 mb-5 overflow-scroll  '>

                <p className='text-[32px] font-bold py-6 text-center' >Latest on iBlog</p>

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

export default HomePage