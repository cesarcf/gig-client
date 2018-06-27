

/**
*
* Types de Auth
**/
export const LOAD_ADDRESS_BOOK = 'LOAD_ADDRESS_BOOK'
export const UPDATE_CONTACT_ADDRESS_BOOK = 'UPDATE_CONTACT_ADDRESS_BOOK'
export const DELETE_CONTACT_ADDRESS_BOOK = 'DELETE_CONTACT_ADDRESS_BOOK'
export const ADD_CONTACT_ADDRESS_BOOK = 'ADD_CONTACT_ADDRESS_BOOK'
export const CLEAR_ADDRESS_BOOK = 'CLEAR_ADDRESS_BOOK'


/**
*
* Actions loadAddressBook
**/
export const loadAddressBook = () => (dispatch, getState, api) => {
	api.get('/address-book')
		.then(res => {
			dispatch({ type: LOAD_ADDRESS_BOOK, payload: res.data.addressBooks })
		})
}

/**
*
* Actions updateAddressBook
**/
export const updateContact = (values) => (dispatch, getState, api) => {
	api.post(`/address-book/${values._id}`, values, { headers: { 'X-HTTP-Method-Override': 'PUT' }})
		.then(res => {
			dispatch({ type: UPDATE_CONTACT_ADDRESS_BOOK, payload: res.data.contact })
		})
}

/**
*
* Actions deleteAddressBook
**/
export const deleteContact = (_id) => (dispatch, getState, api) => {
	api.post(`/address-book/${_id}`,null, { headers: { 'X-HTTP-Method-Override': 'DELETE' }})
		.then(res => {
			dispatch({ type: DELETE_CONTACT_ADDRESS_BOOK, payload: res.data._id })
		})
}


/**
*
* Actions addAddressBook
**/
export const addContact = (values) => (dispatch, getState, api) => {
	api.post('/address-book', values)
		.then(res => {
			dispatch({ type: ADD_CONTACT_ADDRESS_BOOK, payload: res.data.contact })
		})
}

/**
*
* Actions clearAddressBook
**/
export const clearAddressBook = () => ({ type: CLEAR_ADDRESS_BOOK })


