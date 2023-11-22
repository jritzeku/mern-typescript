import * as actions from '../constants/UserConstants';
import { AnyAction } from 'redux'

export const userLoginReducer = (state = {}, action: AnyAction) => {

    switch (action.type) {
        case actions.USER_LOGIN_REQUEST:
            return {
                loading: true,
            };
        case actions.USER_LOGIN_SUCCESS:
            return {
                loading: false,
                success: true,
                userInfo: action.payload
            };
        case actions.USER_LOGIN_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case actions.USER_LOGOUT:
            return {
                loading: false,
                userInfo: null
            };
        default:
            return state;
    }

}

export const userRegisterReducer = (state = {}, action: any) => {

    switch (action.type) {
        case actions.USER_REGISTER_REQUEST:

            return {
                loading: true
            };
        // case actions.USER_LOGIN_SUCCESS: 
        //     return {
        //         loading: false,
        //         success: true,
        //     };

        case actions.USER_REGISTER_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case actions.USER_REGISTER_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}


export const userDeleteReducer = (state = {}, action: any) => {

    switch (action.type) {
        case actions.DELETE_USER_REQUEST:
            return {
                loading: true
            };
        case actions.DELETE_USER_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case actions.DELETE_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }

}
