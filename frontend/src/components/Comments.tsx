import React, { useState, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { IComment } from "../interfaces/IComment";
import { deleteComment, editComment, getPostComments } from "../redux/actions/PostActions";
import { toast } from "react-toastify";
import EditComment from "./EditComment";
import Confirm from "./Confirm";


interface IProps {
    postId: string | undefined;
}

const Comments: React.FC<IProps> = ({ postId }) => {

    const dispatch = useDispatch()

    const { userInfo } = useSelector((state: RootStateOrAny) => state.userLogin);

    const { loading, comments, error } = useSelector((state: RootStateOrAny) => state.postGetComments)

    const [activeCommentId, setActiveCommentId] = useState('')
    const [activeCommentContent, setActiveCommentContent] = useState('')


    const [openEditComment, setOpenEditComment] = useState(false)
    const [openConfirmComment, setOpenConfirmComment] = useState(false)


    useEffect(() => {

        dispatch(getPostComments(postId as string))
    }, [dispatch, postId])

    const editCommentHandler = (content: string) => {

        console.log('Inside editCommentHandler')
        dispatch(editComment(activeCommentId as string, {
            postId: postId,
            content: content
        }))
        toast.success('Comment edited successfully')
    }

    const deleteCommentHandler = () => {
        console.log('Inside deleteCommentHandler')
        dispatch(deleteComment(activeCommentId as string))
        toast.success('Comment deleted successfully')
        // setOpenConfirmComment(false)
    }

    return (

        <div className='flex flex-col   gap-3'>
            {openEditComment && (
                <EditComment
                    activeCommentContent={activeCommentContent}
                    open={openEditComment}
                    onClose={() => {
                        setOpenEditComment(false)
                    }}
                    handleEditComment={editCommentHandler}
                />
            )}

            {openConfirmComment && (
                <Confirm
                    // list={list}
                    title='Delete comment'
                    msg='Are you sure you want to delete your comment?'
                    open={openConfirmComment}
                    onClose={() => {
                        setOpenConfirmComment(false)
                    }}
                    // setOpenConfirm={setOpenConfirm}
                    handlerFunc={deleteCommentHandler}
                />
            )}


            {comments?.map((comment: IComment) => (


                <div className="flex items-center  gap-2 border-b-[1px] p-2 my-4'">
                    <div className=" border-2">
                        <div className="w-[40px] rounded-full border-2">
                            <img src="/images/user.png" alt="" />
                        </div>
                    </div>
                    <div className="text-[12px]">


                        <div className="flex items-center gap-5">
                            <p className="font-bold ">{comment.user.name}</p>
                            {userInfo?.id === comment?.user?._id && (
                                <div className="flex pt-2 gap-2">
                                    <p
                                        onClick={() => {
                                            setActiveCommentId(comment._id)
                                            setActiveCommentContent(comment.content)
                                            setOpenEditComment(true)
                                        }}
                                        className=" text-blue-600  cursor-pointer hover:brightness-75 "

                                    >Edit</p>
                                    <p
                                        onClick={() => {
                                            setActiveCommentId(comment._id)
                                            setActiveCommentContent(comment.content)
                                            setOpenConfirmComment(true)
                                        }}
                                        className="text-red-600 cursor-pointer hover:brightness-75 "
                                    >Delete</p>
                                </div>
                            )
                            }

                        </div>

                        <p>{comment.content}</p>


                    </div>

                </div>

            ))}
        </div>
    )
}

export default Comments