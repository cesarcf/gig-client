import { createStore, applyMiddleware, combineReducers } from 'redux'
import axios from 'axios'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle'
import { createLogger } from 'redux-logger'


//Cargamos el state de localStorage y se lo pasamos al Store como State
const PERSISTED_STATE_IN_LOCAL_STORAGE = loadState()

/**
* Axios Instance
**/
const axiosInstance = axios.create({
	baseURL: (process.env.NODE_ENV !== 'production') ? 'http://localhost:5000' : HOST_PRODUCTION
})


/**
* Middleware before send Request
**/
axiosInstance.interceptors.request.use(config => {
	const token = store.getState().auth.authenticated
	if(token){
		config.headers.Authorization = token
	}

	return config
})



//Middlewares
const middlewares = [thunk.withExtraArgument(axiosInstance)];
if (process.env.NODE_ENV !== 'production') {
	//Estos son los que utilizamos en Development
	middlewares.push(createLogger())
}


/**
* Creamos el Store
**/
const store = createStore(
	reducers,
	PERSISTED_STATE_IN_LOCAL_STORAGE,//Persisted State in localStorage
	applyMiddleware(...middlewares)
)

/**
* Nos suscribimos al Store para que cada vez que haya algun cambio
* en el Store, guarde los nuevos valores en localStorage.
* Esta actualizacion la hace cada 1s gracias al metodo de "lodash" -> throttle
* que lanza la actualizacion cada 1s para que no tengamos sobrecarga.
**/
store.subscribe(throttle(() => {
	saveState({
		auth: store.getState().auth,
		user: store.getState().user,
		form: store.getState().form,//redux-forms
		addressBook: store.getState().addressBook
	})
}, 1000));


export default store