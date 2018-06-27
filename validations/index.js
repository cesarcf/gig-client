import validator from 'validator'
import axios from 'axios'


/* VALIDATIONS FIELD */
///////////////////////////////////////////////////////////

/**
*
* Funcion para chequear los campos del form de manera asyncrona
* antes de enviar el form al servidor
**/
export const asyncValidate = (values) => {
	//Solo se llama a la funcion cuando pasa la "validacion del campo de manera exitosa".
	//Hacemos una llamada a la API para comprobar el valor
	//El "error" lo recibe a traves de "meta.error"
	if(values.email){
		return axios.post('/user/email', { email: values.email })
			.then((res) => {
				if(res.data.email){
					throw { email: 'This email already exists in our database!' }
				} else {
					undefined
				}
			})
	}//fin email

}

/**
* Validacion del campo "requerido"
**/
export const required = (value, allValues, props) => {
	return value || typeof value === 'number' ? undefined : 'Required'
}


/**
* Validacion del campo "FirstName"
**/
export const validateFirstName = (value, allValues, props) => {
	return value && /^[A-Za-zÁáÉéÍíÓóÚúñÑÄäËëÏïÖöÜü\s\.(),\/_-ªº]{3,}$/.test(value)
		? undefined
		: 'Incorrect Name Format! (3 or more Characters)'
}


/**
* Validacion del campo "lastName"
**/
export const validateLastName = (value, allValues, props) => {
	return value && /^[A-Za-zÁáÉéÍíÓóÚúñÑÄäËëÏïÖöÜü\s\.(),\/_-ªº]{3,}$/.test(value)
		? undefined
		: 'Incorrect LastName Format! (3 or more Characters)'
}

/**
* Validacion del campo "Email"
**/
export const validateEmail = (value, allValues, props) => {
	return value && validator.isEmail(value)
		? undefined
		: 'Incorrect Email Format!'
}

/**
* Validacion del campo "Password"
**/
export const validatePassword = (value, allValues, props) => {
	return value && /^.{4,}$/.test(value)
		? undefined
		: 'Minimum 4 Characters!'
}

/**
* Validacion del campo "Movil"
**/
export const validateMovil = (value, allValues, props) =>
	value && !/^(\+34|0034|34)?[6|7|9][0-9]{8}$/.test(value)
		? '9 numbers!'
		: undefined

/* NORMALIZE FIELD */
///////////////////////////////////////////////////////////
export const toLowerCase = (value) => value.toLowerCase()









