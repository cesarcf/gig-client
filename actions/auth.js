import { getUserProfile, clearUserProfile } from './user'
import { clearAddressBook } from './addressBook'

/**
*
* Types de Auth
**/
export const AUTH_USER = 'AUTH_USER'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_SAVE_TOKEN = 'AUTH_SAVE_TOKEN'

/**
*
* Actions signUp
**/
export const signUp = (formData, history) => (dispatch, getState, api) => {
	api.post('/auth/signup', formData)
	.then(res => {
		dispatch({ type: AUTH_USER, payload: res.data.token })
		dispatch(getUserProfile())
		history.push('/dashboard')
	})
	.catch(err => {
		dispatch({ type: AUTH_ERROR, payload: 'Error al crear la cuenta!' })
	})

}

/**
*
* Actions signIn
**/
export const signIn = (formData, history) => (dispatch, getState, api) => {
	api.post('/auth/signin', formData)
		.then(res => {
			dispatch({ type: AUTH_USER, payload: res.data.token })
			dispatch(getUserProfile())
			history.push('/dashboard')
		})
		.catch(err => {
			dispatch({ type: AUTH_ERROR, payload: 'Acceso incorrecto a la cuenta!' })
		})
}


/**
*
* Actions signOut
**/
export const signOut = () => (dispatch) => {
	dispatch({ type: AUTH_USER, payload: '' })
	dispatch(clearUserProfile())
	dispatch(clearAddressBook()) //Limpia localStorage
}


/**
*
* Clean Error
**/
export const cleanError = () => ({ type: AUTH_ERROR, payload: '' })



/**
*
* Actions con la que añada el token OAUTH de GOOGLE o FACEBOOK al Store
**/
export const saveToken = (token) => (dispatch, getState, api) => {
	api.get('/auth', { headers: { 'Authorization': token } })
		.then(res => {
			dispatch({ type: AUTH_SAVE_TOKEN, payload: token })
			dispatch(getUserProfile())
		})
		.catch(err => {
			dispatch({ type: AUTH_ERROR, payload: 'Invalid Credentials!' })
		})

}






