import React, { useState, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { createComment, deleteComment, deletePost, editComment, editPost, getPost, getPosts } from "../redux/actions/PostActions";
import { ICreatePost, IPost } from "../interfaces/IPost";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthStatus } from "../hooks/useAuthStatus";
import DateFormatter from "../utils/DateFormatter";
import EditPost from "../components/EditPost";
import Confirm from "../components/Confirm";
import { toast } from "react-toastify";
import CreateComment from "../components/CreateComment";
import Comments from "../components/Comments";
import EditComment from "../components/EditComment";

type TId = {
  id: IPost['_id']
}

// interface TId {
//   id: IPost['_id']
// }

const PostDetailsPage = () => {
  const { id } = useParams<TId>()

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const { loading, post, success, error } = useSelector((state: RootStateOrAny) => state.postGet);

  const { userInfo } = useSelector((state: RootStateOrAny) => state.userLogin);

  const { loading: loadingEdit, success: successEdit, error: errorEdit } = useSelector(
    (state: RootStateOrAny) => state.postEdit
  )

  const { loading: loadingDelete, success: successDelete, error: errorDelete } = useSelector((state: RootStateOrAny) => state.postDelete);

  const { loading: loadingCreateComment, success: successCreateComment, error: errorCreateComment } = useSelector(
    (state: RootStateOrAny) => state.postCreateComment
  )

  const { loading: loadingEditComment, success: successEditComment, error: errorEditComment } = useSelector(
    (state: RootStateOrAny) => state.postEditComment
  )

  const { loading: loadingDeleteComment, success: successDeleteComment, error: errorDeleteComment } = useSelector(
    (state: RootStateOrAny) => state.postDeleteComment
  )


  const [openEdit, setOpenEdit] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)


  useEffect(() => {
    dispatch(getPost(id as string))
  }, [id, dispatch, successEdit, successDelete, successCreateComment, successEditComment, successDeleteComment])


  const deletePostHandler = () => {
    console.log('Inside deletePostHandler')
    dispatch(deletePost(id as string))
    toast.success('Post deleted successfully')
    setOpenConfirm(false)
  }

  const editPostHandler = (data: ICreatePost) => {
    console.log('Inside editPostHandler')
    dispatch(editPost(id as string, data))
    toast.success('Post edited successfully')
    setOpenEdit(false)
  }

  const createCommentHandler = (content: string) => {
    console.log('Inside createCommentHandler')
    dispatch(createComment({
      postId: id,
      content: content
    }))
    toast.success('Comment added successfully')
  }


  return (

    <div className='flex justify-center overflow-scroll pt-[100px] h-screen'>

      {
        loading ? (
          <p>loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (

          <>
            {openEdit && (
              <EditPost
                // id={id}
                post={post}
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                handleEdit={editPostHandler}
              />
            )}


            {openConfirm && (
              <Confirm
                // list={list}
                title='Delete post'
                msg='Are you sure you want to delete your post?'
                open={openConfirm}
                onClose={() => {
                  setOpenConfirm(false)
                }}
                // setOpenConfirm={setOpenConfirm}
                handlerFunc={deletePostHandler}
              />
            )}

            < div
              className='flex flex-col gap-4  h-screen  w-[80%] p-4  bg-white  '
            >
              <div>

                <div className="flex items-center justify-between py-2">
                  <p className='font-bold py-2'>{post?.title}</p>


                  {userInfo?.id === post?.user?._id && (
                    <div className="flex items-center justify-center gap-2">
                      <p
                        onClick={() => setOpenEdit(true)}
                        className=" text-blue-600  cursor-pointer hover:brightness-75 "

                      >Edit</p>
                      <p
                        onClick={() => setOpenConfirm(true)}
                        className="text-red-600 cursor-pointer hover:brightness-75 "
                      >Delete</p>
                    </div>
                  )
                  }
                </div>

                <p>
                  {post?.content}
                </p>


              </div>


              <div className="bg-gray-100 p-2 text-[12px]">
                <p className="font-bold py-2">Keywords </p>
                {post?.keywords?.map((kw: any) => <span className="mr-1 text-gray-600">{kw} , </span>)

                }
              </div>

              <div className='flex flex-col gap-3 py-2 border-t-[1px] text-gray-600 text-[12px]'>

                <p>
                  Author:  <span className='text-purple-700'>{post?.user?.name}</span>
                </p>
                <p >
                  Posted date: <DateFormatter date={post?.createdAt} />
                </p>

              </div>

              {/* cCmments */}
              <div className=" p-2 text-[12px]">

                <p className="font-bold py-2 text-[16px]"> Comments</p>

                <Comments postId={id} />

                <CreateComment createCommentHandler={createCommentHandler} />

              </div>
            </div >

          </>


        )
      }
    </div >
  )
}
export default PostDetailsPage