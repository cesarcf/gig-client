import { USER_PROFILE, CLEAR_PROFILE } from '../actions/user'



export default (state=null, action) => {
	switch(action.type) {
		case USER_PROFILE:
			return { ...state, ...action.payload }

		case CLEAR_PROFILE:
			return null

		default:
			return state
	}
}

