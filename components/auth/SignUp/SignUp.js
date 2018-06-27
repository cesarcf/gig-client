import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import InputField from '../../common/ReduxForm/InputField'
import CheckBoxField from '../../common/ReduxForm/CheckBoxField'

import { required, asyncValidate, validateEmail, validatePassword, validateFirstName, toLowerCase } from '../../../validations'
import { signUp, cleanError } from '../../../actions/auth'
import capitalize from 'capitalize'

class SignUp extends Component {

	onSubmit = (values) => {
		const { firstName, email, password } = values
		this.props.signUp({ firstName, email, password }, this.props.history)
	}

	render(){
		const { errorMessage, handleSubmit, submitting, invalid, pristine } = this.props

		return (
			<div className='signup'>
				<h2>Create an Account</h2>
				<form id='signup' className='form-vertical' onSubmit={ handleSubmit(this.onSubmit) } novalidate='novalidate' autocomplete='off'>
					<Field name="firstName" validate={[validateFirstName]} normalize={capitalize.words} component={InputField} type="text" placeholder="FirstName" />
					<Field name="email" validate={[validateEmail]} normalize={toLowerCase} component={InputField} type="text" placeholder="Email" />
					<Field name="password" validate={[validatePassword]} component={InputField} type="password" placeholder="Password" />
					<Field name="terminos" id='terminos' validate={[required]} component={CheckBoxField} type="checkbox" className='terminos' label="I accept Use and Privacy Policy" />
					<button className='btn-primary btn-block' type='submit' disabled={submitting || invalid || pristine || errorMessage}>Create Account!</button>
					{errorMessage &&
					<div className='form-error' onClick={ this.props.cleanError }>
						<span className='error'>{errorMessage}</span>
					</div>
					}
				</form>
			</div>
		)
	}

	componentWillUnmount(){
		this.props.cleanError()
	}
}


const mapStateToProps = ({ auth: { errorMessage } }) => {
	return {
		errorMessage
	}
}

export default compose(
	connect(mapStateToProps, { signUp, cleanError }),
	reduxForm({
		form: 'signUp',
		asyncValidate,
		asyncChangeFields: ['email']
	})
)(SignUp)

