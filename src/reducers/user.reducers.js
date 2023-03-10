import { userConstants } from "../actions/constants";

const initState = {
    error: null,
    loading: false,
    message: false
};

export default (state = initState, action) => {
    switch (action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                message: action.payload.message,
                loading: false
            };
            break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

    }

    return state;
};