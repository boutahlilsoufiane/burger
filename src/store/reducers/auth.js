import { AUTH_START, AUTH_SUCCESS, AUTH_FAIL, LOGOUT } from "../actions/actionTypes"

const initalState = {
    loading: false,
    error: null,
    token: null,
    userId: null
}

const authStart = (state) => {
    return {
        ...state,
        loading: true,
        error: null
    }
}

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        userId: action.userId,
        loading: false
    }
}

const authFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.err
    }
}

const logout = (state, action) => {
    return {
        ...state,
        userId: null,
        token: null
    }
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case AUTH_START: return authStart(state);
        case AUTH_SUCCESS: return authSuccess(state, action);
        case AUTH_FAIL: return authFail(state, action);
        case LOGOUT: return logout(state, action);
        default: return state;
    }
}

export default reducer