import axios from 'axios';
import { Dispatch } from 'redux';
import * as actions from '../constants/PostConstants';
import * as commentActions from '../constants/CommentConstants';
import { IPost, ICreatePost } from '../../interfaces/IPost';
import { IComment, ICreateComment } from '../../interfaces/IComment';

export const createPost = (postData: ICreatePost) => async (dispatch: Dispatch, getState: any) => {
    try {
        dispatch({ type: actions.CREATE_POST_REQUEST })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/JSON',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        console.log('postData', postData)
        await axios.post('/api/posts', postData, config)
        dispatch({ type: actions.CREATE_POST_SUCCESS })





    } catch (error: any) {
        dispatch({
            type: actions.CREATE_POST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const editPost = (postId: IPost['_id'], postData: ICreatePost) => async (dispatch: Dispatch, getState: any) => {
    try {
        dispatch({ type: actions.EDIT_POST_REQUEST })
        const { userLogin: { userInfo } } = getState()
        console.log("Inside editPost action")
        const config = {
            headers: {
                'Content-Type': 'application/JSON',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/posts/${postId}`, postData, config)
        console.log('data ', data)
        dispatch({ type: actions.EDIT_POST_SUCCESS })


    } catch (error: any) {
        dispatch({
            type: actions.EDIT_POST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const deletePost = (postId: IPost['_id']) => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: actions.DELETE_POST_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/posts/${postId}`, config)
        dispatch({ type: actions.DELETE_POST_SUCCESS })

    } catch (error: any) {
        dispatch({
            type: actions.DELETE_POST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const getPosts = () => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: actions.GET_POSTS_REQUEST })
        const { data } = await axios.get(
            '/api/posts'
        )

        console.log('data:', data)

        dispatch({ type: actions.GET_POSTS_SUCCESS, payload: data })
    } catch (error: any) {

        dispatch({
            type: actions.GET_POSTS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const getPost = (postId: IPost['_id']) => async (dispatch: Dispatch, getState: any) => {
    try {
        dispatch({ type: actions.GET_POST_REQUEST })

        const { data } = await axios.get(`/api/posts/${postId}`)

        dispatch({ type: actions.GET_POST_SUCCESS, payload: data })

        console.log('data:', data)

    } catch (error: any) {
        dispatch({
            type: actions.GET_POST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const getMyPosts = () => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: actions.GET_MY_POSTS_REQUEST })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/JSON',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            '/api/posts/myPosts', config
        )

        console.log('data:', data)

        dispatch({ type: actions.GET_MY_POSTS_SUCCESS, payload: data })
    } catch (error: any) {

        dispatch({
            type: actions.GET_MY_POSTS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const getPostComments = (postId: IPost['_id']) => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: commentActions.GET_COMMENTS_REQUEST })
        const { data } = await axios.get(
            `/api/comments/post/${postId}`,
        )

        console.log('data:', data)

        dispatch({ type: commentActions.GET_COMMENTS_SUCCESS, payload: data })
    } catch (error: any) {

        dispatch({
            type: commentActions.GET_COMMENTS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}


export const createComment = (commentData: ICreateComment) => async (dispatch: Dispatch, getState: any) => {
    try {
        dispatch({ type: commentActions.CREATE_COMMENT_REQUEST })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/JSON',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        await axios.post('/api/comments', commentData, config)

        dispatch({ type: commentActions.CREATE_COMMENT_SUCCESS })

    } catch (error: any) {
        dispatch({
            type: commentActions.CREATE_COMMENT_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}


export const editComment = (commentId: IComment['_id'], commentData: ICreateComment) => async (dispatch: Dispatch, getState: any) => {
    try {
        dispatch({ type: commentActions.CREATE_COMMENT_REQUEST })
        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/JSON',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        await axios.put(`/api/comments/${commentId}`, commentData, config)
        dispatch({ type: commentActions.CREATE_COMMENT_SUCCESS })
    } catch (error: any) {
        dispatch({
            type: commentActions.CREATE_COMMENT_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}


export const deleteComment = (commentId: IComment['_id']) => async (dispatch: Dispatch, getState: any) => {

    try {
        dispatch({ type: commentActions.DELETE_COMMENT_REQUEST })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Authorization': `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/comments/${commentId}`, config)
        dispatch({ type: commentActions.DELETE_COMMENT_SUCCESS })

    } catch (error: any) {
        dispatch({
            type: commentActions.DELETE_COMMENT_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}