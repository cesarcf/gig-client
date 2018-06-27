import { AUTH_USER, AUTH_ERROR, AUTH_SAVE_TOKEN } from '../actions/auth'

const INITIAL_STATE = {
	authenticated: '',
	errorMessage: ''
}

/**
* AuthReducer
**/
export default (state=INITIAL_STATE, action) => {
	switch(action.type) {
		case AUTH_USER:
			return { ...state, authenticated: action.payload }

		case AUTH_ERROR:
			return { ...state, errorMessage: action.payload }

		case AUTH_SAVE_TOKEN:
			return { ...state, authenticated: action.payload }

		default:
			return state
	}
}
