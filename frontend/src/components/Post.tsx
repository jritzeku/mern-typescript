import React from 'react'
import { IPost } from '../interfaces/IPost'
import DateFormatter from '../utils/DateFormatter';
import { truncate } from '../utils/truncate';

interface Props {
    post: IPost;
}

const Post = ({ post }: Props) => {
    return (
        <div
            className='flex flex-col gap-4 border-2  p-4 bg-white hover:border-purple-400 '
        >

            <p className='font-bold'>{post.title}</p>

            <p>
                {truncate(post.content)}
                {/* {post.content} */}
            </p>


            <div className='flex flex-col gap-3 py-2 border-t-[1px] text-gray-600 text-[12px]'>
                <p >
                    Author: {post.user?.name}
                </p>

                <p >
                    Posted date: <DateFormatter date={post.createdAt} />
                </p>

            </div>



        </div>
    )
}

export default Post