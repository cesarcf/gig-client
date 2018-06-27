import {
	LOAD_ADDRESS_BOOK,
	CLEAR_ADDRESS_BOOK,
	UPDATE_CONTACT_ADDRESS_BOOK,
	DELETE_CONTACT_ADDRESS_BOOK,
	ADD_CONTACT_ADDRESS_BOOK
} from '../actions/addressBook'



export default (state=[], action) => {

	let index = null

	switch(action.type) {
		case LOAD_ADDRESS_BOOK:
			return [...action.payload]

		case CLEAR_ADDRESS_BOOK:
			return []

		case UPDATE_CONTACT_ADDRESS_BOOK:
			index = state.findIndex(contact => contact._id === action.payload._id)
			return [
				...state.slice(0, index),
				action.payload,
				...state.slice(index + 1),
			]

		case DELETE_CONTACT_ADDRESS_BOOK:
			index = state.findIndex(contact => contact._id === action.payload)
			return [
				...state.slice(0, index),
				...state.slice(index + 1),
			]

		case ADD_CONTACT_ADDRESS_BOOK:
			return [
				action.payload,
				...state,
			]

		default:
			return state
	}
}

