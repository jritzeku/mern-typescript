import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { userLoginReducer, userRegisterReducer } from "./reducers/UserReducers";
import {
    postCreateCommentReducer, postCreateReducer, postGetCommentsReducer,
    postDeleteCommentReducer, postDeleteReducer, postEditCommentReducer,
    postEditReducer, postGetReducer, postsGetReducer,postsGetMyReducer
} from "./reducers/PostReducers";

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducers = combineReducers({
    //user reducers
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,

    //post reducers 
    postCreate: postCreateReducer,
    postsGet: postsGetReducer,
    postGet: postGetReducer,
    postsGetMy:  postsGetMyReducer,
    postEdit: postEditReducer,
    postDelete: postDeleteReducer,
    postGetComments: postGetCommentsReducer,
    postCreateComment: postCreateCommentReducer,
    postEditComment: postEditCommentReducer,
    postDeleteComment: postDeleteCommentReducer




})



const userInfoFromStorage = JSON.parse(localStorage.getItem('userInfo')!)

const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage
    }
};


const store = createStore(
    rootReducers,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;

/*
NOTES:

-What is '!' In TypeScript?

The non-null assertion operator tells the TypeScript compiler that a value typed as
 optional cannot be null or undefined . For example, if we define a variable as 
 possibly a string or undefined, the ! operator tells the compiler to ignore the 
 
 
 possibility of it being undefined.


*/