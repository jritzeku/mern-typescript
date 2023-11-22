import * as actions from '../constants/PostConstants';
import * as commentActions from '../constants/CommentConstants';
import { AnyAction } from 'redux'
import { IPost } from '../../interfaces/IPost';

const initialState: { posts: IPost[] } = {
    posts: [],
};


export const postCreateReducer = (state = {}, action: AnyAction) => {

    switch (action.type) {
        case actions.CREATE_POST_REQUEST:
            return {
                loading: true
            };
        case actions.CREATE_POST_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case actions.CREATE_POST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actions.CREATE_POST_RESET:
            return {}
        default:
            return state;
    }

}

export const postEditReducer = (state = {}, action: AnyAction) => {

    switch (action.type) {
        case actions.EDIT_POST_REQUEST:
            return {
                loading: true
            }
        case actions.EDIT_POST_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case actions.EDIT_POST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }

}

export const postDeleteReducer = (state = {}, action: AnyAction) => {

    switch (action.type) {
        case actions.DELETE_POST_REQUEST:
            return {
                loading: true
            }
        case actions.DELETE_POST_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case actions.DELETE_POST_FAIL:
            return {}
        default:
            return state;
    }

}

export const postCreateCommentReducer = (state = {}, action: AnyAction) => {
    switch (action.type) {
        case commentActions.CREATE_COMMENT_REQUEST:
            return {
                loading: true
            };
        case commentActions.CREATE_COMMENT_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case commentActions.CREATE_COMMENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const postEditCommentReducer = (state = {}, action: AnyAction) => {
    switch (action.type) {
        case commentActions.EDIT_COMMENT_REQUEST:
            return {
                loading: true
            };
        case commentActions.EDIT_COMMENT_SUCCESS:
            return {
                loading: false,
                success: true
            };
        case commentActions.EDIT_COMMENT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const postDeleteCommentReducer = (state = {}, action: AnyAction) => {

    switch (action.type) {
        case commentActions.DELETE_COMMENT_REQUEST:
            return {
                loading: true
            }
        case commentActions.DELETE_COMMENT_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case commentActions.DELETE_COMMENT_FAIL:
            return {}
        default:
            return state;
    }

}


export const postGetCommentsReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case commentActions.GET_COMMENTS_REQUEST:
            return {
                loading: true
            }
        case commentActions.GET_COMMENTS_SUCCESS:
            console.log('Inside postsGetCommentsReducer SUCCESS case')
            return {
                loading: false,
                //NOTE: action.payload alone is sufficient since not doing pagination 
                //posts: action.payload,
                comments: action.payload
            }
        case commentActions.GET_COMMENTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}



export const postsGetReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case actions.GET_POSTS_REQUEST:
            return {
                loading: true
            }
        case actions.GET_POSTS_SUCCESS:
            console.log('Inside postsGetReducer SUCCESS case')
            return {
                loading: false,
                //NOTE: action.payload alone is sufficient since not doing pagination 
                posts: action.payload,
            }
        case actions.GET_POSTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export const postsGetMyReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case actions.GET_MY_POSTS_REQUEST:
            return {
                loading: true
            }
        case actions.GET_MY_POSTS_SUCCESS:
            return {
                loading: false,
                myPosts: action.payload,
            }
        case actions.GET_MY_POSTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const postGetReducer = (state = { post: {} }, action: AnyAction) => {
    switch (action.type) {
        case actions.GET_POST_REQUEST:
            return {
                loading: true
            }
        case actions.GET_POST_SUCCESS:
            return {
                loading: false,
                post: action.payload,
            }
        case actions.GET_POST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}