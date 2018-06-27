import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { signIn, saveToken, cleanError } from '../../../actions/auth'
import { Field, reduxForm } from 'redux-form'
import InputField from '../../common/ReduxForm/InputField'
import { asyncValidate, validateEmail, validatePassword, toLowerCase } from '../../../validations'



class SingIn extends Component {
	state = {
		hasToken: true
	}

	componentWillMount(){
		const token = new URLSearchParams(this.props.location.search).get('token')

		if(token){
			this.props.saveToken(token)
			this.setState({ hasToken: false })
		}
	}

	onSubmit = (values) => {
		const { email, password } = values
		this.props.signIn({ email, password }, this.props.history)
	}

	render(){
		if(!this.state.hasToken){
			return <div />
		}
		const { errorMessage, handleSubmit, submitting, invalid, pristine } = this.props
		return (
			<div className='login'>
				<h2>ACCESS MY ACCOUNT</h2>
				<form id='signin' className='form-vertical' onSubmit={ handleSubmit(this.onSubmit) } novalidate='novalidate' autocomplete='off'>
					<Field name="email" validate={[validateEmail]} normalize={toLowerCase} component={InputField} type="text" placeholder="Email" />
					<Field name="password" validate={[validatePassword]} component={InputField} type="password" placeholder="Password" />
					<button className='btn-primary btn-block' type='submit' disabled={submitting || invalid || pristine || errorMessage}>LogIn</button>
					{errorMessage &&
					<div className='form-error' onClick={ this.props.cleanError }>
						<span className='error'>{errorMessage}</span>
					</div>
					}
				</form>
				<a href='/auth/google'>Login with <span className="icon-awesome-google-plus"></span> Google</a>
				<a href='/auth/facebook'>Login with <span className="icon-awesome-facebook"></span> Facebook</a>
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
	connect(mapStateToProps,{ signIn, saveToken, cleanError }),
	reduxForm({
		form: 'signIn'
	}),
)(SingIn)
