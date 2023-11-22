import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux'
import { ICreatePost, IPost } from '../interfaces/IPost'
import { createPost, editPost } from '../redux/actions/PostActions'
import { toast } from 'react-toastify'
import Modal from './Modal'

 
interface IProps {
    post: IPost,
    open: boolean,
    onClose: ()=>void
    handleEdit: (arg: ICreatePost) => void
}

const EditPost: React.FC<IProps> = ({ post, open, onClose, handleEdit }) => {

    const [title, setTitle] = useState<ICreatePost['title']>(post.title)
    const [content, setContent] = useState<ICreatePost['content']>(post.content)
    const [keywords, setKeywords] = useState<ICreatePost['keywords']>(post.keywords)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleEdit({ title, content, keywords })
    }

    return (
        <Modal width={'700px'} open={open} onClose={onClose}>

            <div className='text-center pt-[120px] border-2 px-6'>

                <div className="flex items-center justify-between">
                    <p className=' text-2xl mb-8 text-center'>Edit Post </p>
                    <p
                        onClick={onClose}
                        className='cursor-pointer text-[14px] text-gray-600'> x </p>
                </div>

                <div className='flex justify-center mb-6'>
                    <form
                        onSubmit={handleSubmit}
                        className='flex flex-col  gap-5 bg-white w-[800px] py-8 px-4'
                    >

                        <label className='text-left' >Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}

                            type='text '
                            // placeholder='Title'
                            className='rounded border-2 text-[14px] p-2 w-full'
                        />


                        <label className='text-left' >Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            // placeholder='Add content here..'
                            className=" text-[14px]  rounded-lg appearance-none block w-full py-3 px-3 text-base  leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
                            rows={10}
                        ></textarea>

                        <label className='text-left' >Keywords</label>
                        <span className='text-[12px] text-gray-600'> (separate keywords by comma) </span>

                        <input
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            type='text '
                            // placeholder='Keywords'
                            className='rounded border-2 text-[14px] p-2 w-full'
                        />

                        <button
                            type='submit'
                            className='bg-purple-600 rounded px-3 py-2 text-[12px] text-white cursor-pointer hover:brightness-90 w-full'
                        >
                            Edit Post
                        </button>
                    </form>
                </div>


            </div>
        </Modal>


    )
}

export default EditPost
