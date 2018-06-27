
/**
*
* Types de USER
**/
export const USER_PROFILE = 'USER_PROFILE'
export const CLEAR_PROFILE = 'CLEAR_PROFILE'


/**
*
* Actions de USER
**/

export const getUserProfile = () => (dispatch, getState, api) => {

	api.get('/user/profile').then(res => {
		dispatch({ type: USER_PROFILE, payload: res.data.user })
	})

}

export const clearUserProfile = () => ({ type: CLEAR_PROFILE })